import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;
  
  @IsNotEmpty({ message: 'ativo é obrigatório' })
  ativo: boolean;
}
