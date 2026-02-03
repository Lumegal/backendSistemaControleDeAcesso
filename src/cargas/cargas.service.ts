import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargasDto } from './dto/create-cargas.dto';
import { UpdateCargasDto } from './dto/update-cargas.dto';
import { Cargas } from './entities/cargas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CargasService {
  constructor(
    @InjectRepository(Cargas)
    private readonly cargasRepository: Repository<Cargas>,
  ) {}

  async create(createCargasDto: CreateCargasDto) {
    return await this.cargasRepository.save(createCargasDto);
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

    return await this.cargasRepository.save(cargas);
  }

  async remove(id: number) {
    const cargas = await this.findOne(id);

    if (!cargas) {
      throw new NotFoundException();
    }

    return await this.cargasRepository.remove(cargas);
  }
}
