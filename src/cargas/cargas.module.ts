import { Module } from '@nestjs/common';
import { CargasService } from './cargas.service';
import { CargasController } from './cargas.controller';
import { Cargas } from './entities/cargas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cargas]), GatewayModule],
  controllers: [CargasController],
  providers: [CargasService],
})
export class CargasModule {}
