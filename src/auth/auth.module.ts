import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtAuthModule } from './JwtAuthModule';

@Module({
  imports: [UsuarioModule, JwtAuthModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
