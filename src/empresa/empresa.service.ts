import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    const nomeNormalizado = createEmpresaDto.nome.trim().toLowerCase();

    const empresaExistente = await this.empresaRepository.findOne({
      where: {
        nome: nomeNormalizado,
      },
    });

    if (empresaExistente) {
      // já existe → não salva nada
      return empresaExistente;
      // ou return null; se preferir
    }

    const empresa = this.empresaRepository.create({
      ...createEmpresaDto,
      nome: nomeNormalizado,
    });

    return await this.empresaRepository.save(empresa);
  }

  async findAll() {
    return await this.empresaRepository.find();
  }

  async findOne(id: number) {
    return await this.empresaRepository.findOne({ where: { id } });
  }

  async findOneByNome(nome: string) {
    return await this.empresaRepository.findOne({
      where: { nome },
    });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.findOne(id);

    if (!empresa) {
      throw new NotFoundException();
    }

    Object.assign(empresa, updateEmpresaDto);

    return await this.empresaRepository.save(empresa);
  }

  async remove(id: number) {
    const empresa = await this.findOne(id);

    if (!empresa) {
      throw new NotFoundException();
    }

    return await this.empresaRepository.remove(empresa);
  }
}
