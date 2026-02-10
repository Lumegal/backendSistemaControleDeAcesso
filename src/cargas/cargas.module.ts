import { Module } from '@nestjs/common';
import { CargasService } from './cargas.service';
import { CargasController } from './cargas.controller';
import { Cargas } from './entities/cargas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Placa } from 'src/placa/entities/placa.entity';
import { Motorista } from 'src/motorista/entities/motorista.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cargas, Empresa, Motorista, Placa]),
    GatewayModule,
  ],
  controllers: [CargasController],
  providers: [CargasService],
})
export class CargasModule {}
