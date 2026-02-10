import { Module } from '@nestjs/common';
import { PlacaService } from './placa.service';
import { PlacaController } from './placa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Placa } from './entities/placa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Placa])],
  controllers: [PlacaController],
  providers: [PlacaService],
})
export class PlacaModule {}
