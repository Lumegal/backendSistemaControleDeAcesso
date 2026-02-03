import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargasService } from './cargas.service';
import { CreateCargasDto } from './dto/create-cargas.dto';
import { UpdateCargasDto } from './dto/update-cargas.dto';

@Controller('cargas')
export class CargasController {
  constructor(private readonly cargasService: CargasService) {}

  @Post()
  create(@Body() createCargasDto: CreateCargasDto) {
    return this.cargasService.create(createCargasDto);
  }

  @Get()
  findAll() {
    return this.cargasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargasDto: UpdateCargasDto) {
    return this.cargasService.update(+id, updateCargasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargasService.remove(+id);
  }
}
