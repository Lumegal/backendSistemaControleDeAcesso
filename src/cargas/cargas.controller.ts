import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import express from 'express';
import { CargasService } from './cargas.service';
import { CreateCargasDto } from './dto/create-cargas.dto';
import { UpdateCargasDto } from './dto/update-cargas.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FiltroCargasDto } from './dto/filtro-cargas.dto';

@Controller('cargas')
export class CargasController {
  constructor(private readonly cargasService: CargasService) {}

  @Post()
  create(@Body() createCargasDto: CreateCargasDto) {
    return this.cargasService.create(createCargasDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Arquivo não enviado');
    }

    return await this.cargasService.importCsv(file.buffer);
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

  @Post('filtrar')
  async filtrar(@Body() body: any) {
    return this.cargasService.filtrar(
      body.filtros,
      body.campos,
      body.tipoExport,
    );
  }
}
