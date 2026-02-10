import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { Motorista } from './entities/motorista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Motorista])],
  controllers: [MotoristaController],
  providers: [MotoristaService],
})
export class MotoristaModule {}
