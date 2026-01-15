import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    if (!body.email || !body.senha) {
      return { message: 'Informe e-mail e senha para efetuar o login' };
    }
    const usuario = await this.authService.validateUser(body.email, body.senha);

    if (usuario) {
      return this.authService.login(usuario);
    }

    throw new UnauthorizedException('Usuário ou senha inválidos');
  }
}
