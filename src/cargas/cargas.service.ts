import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCargasDto } from './dto/create-cargas.dto';
import { UpdateCargasDto } from './dto/update-cargas.dto';
import { Cargas, TipoOperacao } from './entities/cargas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyGateway } from 'src/gateway/gateway';
import { parse } from 'csv-parse/sync';
import { Motorista } from 'src/motorista/entities/motorista.entity';
import { Placa } from 'src/placa/entities/placa.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Injectable()
export class CargasService {
  constructor(
    @InjectRepository(Cargas)
    private readonly cargasRepository: Repository<Cargas>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Motorista)
    private readonly motoristaRepository: Repository<Motorista>,

    @InjectRepository(Placa)
    private readonly placaRepository: Repository<Placa>,

    private readonly gateway: MyGateway,
  ) {}

  private parseTipoOperacao(valor: string) {
    const v = valor.toLowerCase().replace(/\s+/g, ''); // remove espaços e quebras de linha

    // console.log('Carregamento?: ', v == 'carregamento');

    if (v == 'carregamento') return TipoOperacao.CARREGAMENTO;
    if (v == 'descarregamento') return TipoOperacao.DESCARREGAMENTO;
  }

  private parseDataHora(data?: string, hora?: string): Date | null {
    if (!data || !hora) return null;

    const dataTrim = data.trim();
    const horaTrim = hora.trim();

    if (!dataTrim || !horaTrim) return null;

    const partesData = dataTrim.split('/');
    if (partesData.length !== 3) return null;

    const [dia, mes, ano] = partesData;

    const iso = `${ano}-${mes}-${dia}T${horaTrim}:00`;
    const date = new Date(iso);

    if (isNaN(date.getTime())) return null;

    return date;
  }

  private formatarPlaca(valor?: string) {
    if (!valor) return '';

    // remove espaços, traços etc e deixa maiúsculo
    const limpa = valor.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (limpa.length < 7) return limpa; // evita erro se vier incompleta

    const letras = limpa.slice(0, 3);
    const numeros = limpa.slice(3, 7);

    return `${letras}-${numeros}`;
  }

  private formatarCelular(valor: string) {
    if (!valor) return '';

    const numeros = valor.replace('-', '');
    const ddd = numeros.slice(0, 2);
    const parte1 = numeros.slice(2, 7);
    const parte2 = numeros.slice(7);
    return `(${ddd}) ${parte1}-${parte2}`;
  }

  async importCsv(buffer: Buffer) {
    const content = buffer.toString('utf-8');

    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ';',
      bom: true,
      trim: true,
    });

    let linhaAtual = 2;

    console.log('Início da importação do CSV');

    for (const row of records as Record<string, string>[]) {
      try {
        const chegada = this.parseDataHora(row['DATA'], row['CHEGADA']);
        if (!chegada) continue;

        const entrada = this.parseDataHora(row['DATA'], row['ENTRADA']);
        const saida = this.parseDataHora(row['DATA'], row['SAÍDA']);

        const tipoOperacao = this.parseTipoOperacao(
          row['CARREGAMENTO/DESCARREGAMENTO'],
        );

        const nomeEmpresa = row['EMPRESA']?.trim().toUpperCase();
        const nomeMotorista = row['NOME']?.trim().toUpperCase();
        const rgCpf = row['RG']?.trim().toUpperCase();
        const celular = this.formatarCelular(row['CELULAR']?.trim());
        const placaValor = this.formatarPlaca(row['PLACA']);

        // ===== EMPRESA =====
        let empresa = await this.empresaRepository.findOne({
          where: { nome: nomeEmpresa },
        });

        if (!empresa) {
          empresa = this.empresaRepository.create({ nome: nomeEmpresa });
          empresa = await this.empresaRepository.save(empresa);
        }

        // ===== MOTORISTA =====
        let motorista = await this.motoristaRepository.findOne({
          where: { rgCpf },
        });

        if (!motorista) {
          motorista = this.motoristaRepository.create({
            nome: nomeMotorista,
            rgCpf,
            celular,
          });
          motorista = await this.motoristaRepository.save(motorista);
        }

        // ===== PLACA =====
        let placa = await this.placaRepository.findOne({
          where: { placa: placaValor },
        });

        if (!placa) {
          placa = await this.placaRepository.save(
            this.placaRepository.create({ placa: placaValor }),
          );
        }

        // ===== CARGA =====
        const carga = this.cargasRepository.create({
          chegada,
          entrada: entrada ?? undefined,
          saida: saida ?? undefined,
          empresa,
          placa,
          motorista,
          numeroNotaFiscal: row['Nº DA NOTA FISCAL']?.trim() || undefined,
          tipoOperacao,
        });

        // console.log(carga);

        const jaExisteCarga = await this.cargasRepository.findOne({
          where: {
            chegada,
            empresa,
            motorista,
            tipoOperacao,
          },
        });

        if (jaExisteCarga) {
          console.warn(
            `Linha ${linhaAtual}: duplicado detectado antes do insert`,
          );
        } else {
          try {
            await this.cargasRepository.save(carga);
            console.log(`Carga na linha ${linhaAtual} Salva.`);
          } catch (err: any) {
            console.warn(
              `Linha ${linhaAtual}: erro ao salvar carga, ignorando.`,
            );
            console.warn(err.message);
            console.warn('Erro banco:', err.detail);
            continue;
          }
        }
      } catch (err) {
        console.error(`Linha ${linhaAtual}: erro inesperado:`, err);
        // você pode decidir continuar ou parar, aqui vamos continuar
        continue;
      }

      linhaAtual++;
    }

    this.gateway.emitirCargaAtualizada();

    console.log('Fim da importação do CSV');
  }

  async create(createCargasDto: CreateCargasDto) {
    try {
      const motorista = await this.motoristaRepository.findOne({
        where: { id: createCargasDto.motoristaId },
      });

      if (!motorista) {
        throw new BadRequestException('Motorista não encontrado');
      }

      const empresa = await this.empresaRepository.findOne({
        where: { id: createCargasDto.empresaId },
      });

      if (!empresa) {
        throw new BadRequestException('Empresa não encontrada');
      }

      const placa = await this.placaRepository.findOne({
        where: { id: createCargasDto.placaId },
      });

      if (!placa) {
        throw new BadRequestException('Placa não encontrada');
      }

      const carga = this.cargasRepository.create({
        ...createCargasDto,
        empresa,
        motorista,
        placa,
      });

      const cargaSalva = await this.cargasRepository.save(carga);

      this.gateway.emitirCargaAtualizada(cargaSalva);

      return cargaSalva;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Já existe um carregamento com esses dados',
        );
      }

      throw error;
    }
  }

  async findAll() {
    return await this.cargasRepository.find();
  }

  async findOne(id: number) {
    return await this.cargasRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCargasDto: UpdateCargasDto) {
    const cargas = await this.findOne(id);

    if (!cargas) {
      throw new NotFoundException();
    }

    Object.assign(cargas, updateCargasDto);

    const cargaAtualizada = await this.cargasRepository.save(cargas);

    this.gateway.emitirCargaAtualizada(cargaAtualizada);

    return cargaAtualizada;
  }

  async remove(id: number) {
    const cargas = await this.findOne(id);

    if (!cargas) {
      throw new NotFoundException();
    }

    const cargaAtualizada = await this.cargasRepository.remove(cargas);

    this.gateway.emitirCargaAtualizada(cargaAtualizada);

    return cargaAtualizada;
  }
}
