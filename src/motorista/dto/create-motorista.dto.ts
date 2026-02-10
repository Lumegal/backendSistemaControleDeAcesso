import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMotoristaDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'RG ou CPF é obrigatório' })
  @IsString()
  rgCpf: string;

  @IsOptional()
  @IsString()
  celular: string;
}
