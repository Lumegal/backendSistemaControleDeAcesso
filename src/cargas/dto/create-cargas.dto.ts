import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoOperacao } from '../entities/cargas.entity';

export class CreateCargasDto {
  @IsNotEmpty({ message: 'Chegada é obrigatória' })
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  chegada: string;

  @IsOptional()
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  entrada?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Deve ser uma data válida' })
  saida?: string;

  @IsNotEmpty({ message: 'Empresa é obrigatória' })
  @IsString()
  empresa: string;

  @IsNotEmpty({ message: 'Placa é obrigatória' })
  @IsString()
  placa: string;

  @IsNotEmpty({ message: 'Motorista é obrigatório' })
  @IsString()
  motorista: string;

  @IsNotEmpty({ message: 'RG ou CPF é obrigatório' })
  @IsString()
  rgCpf: string;

  @IsNotEmpty({ message: 'Celular é obrigatório' })
  @IsString()
  celular: string;

  @IsOptional()
  @IsString()
  numeroNotaFiscal?: string;

  @IsNotEmpty({
    message: 'Definir se é carregamento ou descarregamento é obrigatório',
  })
  @IsEnum(TipoOperacao, {
    message: 'Tipo de operação deve ser Carregamento ou Descarregamento',
  })
  tipoOperacao: TipoOperacao;
}
