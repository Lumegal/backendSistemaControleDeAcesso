import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlacaService } from './placa.service';
import { CreatePlacaDto } from './dto/create-placa.dto';
import { UpdatePlacaDto } from './dto/update-placa.dto';

@Controller('placa')
export class PlacaController {
  constructor(private readonly placaService: PlacaService) {}

  @Post()
  create(@Body() createPlacaDto: CreatePlacaDto) {
    return this.placaService.create(createPlacaDto);
  }

  @Get()
  findAll() {
    return this.placaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placaService.findOne(+id);
  }

  @Get(':placa')
  findOneByPlaca(@Param('placa') placa: string) {
    return this.placaService.findOneByPlaca(placa);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlacaDto: UpdatePlacaDto) {
    return this.placaService.update(+id, updatePlacaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placaService.remove(+id);
  }
}
