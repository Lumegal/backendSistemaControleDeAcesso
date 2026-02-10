import { Injectable } from '@nestjs/common';
import { CreatePlacaDto } from './dto/create-placa.dto';
import { UpdatePlacaDto } from './dto/update-placa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Placa } from './entities/placa.entity';

@Injectable()
export class PlacaService {
  constructor(
    @InjectRepository(Placa)
    private readonly placaRepository: Repository<Placa>,
  ) {}
  async create(createPlacaDto: CreatePlacaDto) {
    const placa = this.placaRepository.create(createPlacaDto);

    return await this.placaRepository.save(placa);
  }

  async findAll() {
    return await this.placaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} placa`;
  }

  update(id: number, updatePlacaDto: UpdatePlacaDto) {
    return `This action updates a #${id} placa`;
  }

  remove(id: number) {
    return `This action removes a #${id} placa`;
  }
}
