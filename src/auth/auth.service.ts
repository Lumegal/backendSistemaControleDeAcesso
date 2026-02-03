import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}
  async validateUser(email: string, senha: string) {
    // Buscamos o usuário pelo e-mail
    const usuario = await this.usuarioService.findOneByEmail(email);
    
    // Verificamos se o usuário existe e se a senha está correta
    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      // Se o usuário existe e a senha está correta retornamos o usuário
      return usuario;
    }
    // Caso contrário retornamos null
    return null;
  }

  async login(usuario: { id: number; email: string; nome: string, nivelDeAcesso: number }) {
    // Geramos o token JWT
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      nivelDeAcesso: usuario.nivelDeAcesso
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
