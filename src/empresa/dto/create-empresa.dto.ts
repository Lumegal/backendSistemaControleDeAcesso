import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
