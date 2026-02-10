import { Injectable } from '@nestjs/common';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { Motorista } from './entities/motorista.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MotoristaService {
  constructor(
    @InjectRepository(Motorista)
    private readonly motoristaRepository: Repository<Motorista>,
  ) {}
  async create(createMotoristaDto: CreateMotoristaDto) {
    const motorista = this.motoristaRepository.create(createMotoristaDto);

    return await this.motoristaRepository.save(motorista);
  }

  async findAll() {
    return await this.motoristaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} motorista`;
  }

  update(id: number, updateMotoristaDto: UpdateMotoristaDto) {
    return `This action updates a #${id} motorista`;
  }

  remove(id: number) {
    return `This action removes a #${id} motorista`;
  }
}
