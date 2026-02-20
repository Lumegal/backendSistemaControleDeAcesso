import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FiltroCargasDto {
  @IsOptional()
  @IsString()
  dataInicial?: string;

  @IsOptional()
  @IsString()
  dataFinal?: string;

  @IsOptional()
  @IsString()
  horarioInicial?: string;

  @IsOptional()
  @IsString()
  horarioFinal?: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  numeroNotaFiscal?: string;

  @IsOptional()
  @IsString()
  rgCpf?: string;

  @IsOptional()
  @IsNumber()
  tipoOperacao?: number;
}
