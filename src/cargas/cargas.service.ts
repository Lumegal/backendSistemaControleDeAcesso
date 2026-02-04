import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargasDto } from './dto/create-cargas.dto';
import { UpdateCargasDto } from './dto/update-cargas.dto';
import { Cargas } from './entities/cargas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyGateway } from 'src/gateway/gateway';

@Injectable()
export class CargasService {
  constructor(
    @InjectRepository(Cargas)
    private readonly cargasRepository: Repository<Cargas>,
    private readonly gateway: MyGateway,
  ) {}

  async create(createCargasDto: CreateCargasDto) {
    const cargaSalva = await this.cargasRepository.save(createCargasDto);

    this.gateway.emitirCargaAtualizada(cargaSalva);

    return cargaSalva;
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

    return await this.cargasRepository.remove(cargas);
  }
}
