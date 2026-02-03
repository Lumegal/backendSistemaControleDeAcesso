import { Module } from '@nestjs/common';
import { CargasService } from './cargas.service';
import { CargasController } from './cargas.controller';
import { Cargas } from './entities/cargas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cargas])],
  controllers: [CargasController],
  providers: [CargasService],
})
export class CargasModule {}
