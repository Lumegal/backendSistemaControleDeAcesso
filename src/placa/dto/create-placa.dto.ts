import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlacaDto {
  @IsNotEmpty({ message: 'Placa é obrigatória' })
  @IsString()
  placa: string;
}
