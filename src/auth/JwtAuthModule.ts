import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // chave usada para assinar o token
        secret: configService.get<string>('JWT_SECRET'),
        // cria o exp (quando o token vai expirar)
        signOptions: { expiresIn: '1d' },
        // toda vez que jwtService.sign() for chamado iat e exp serao injetados automaticamente
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
