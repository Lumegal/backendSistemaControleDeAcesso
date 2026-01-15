import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const senha = await bcrypt.hash(createUsuarioDto.senha, 10); // Usamos o bcrypt para a hash da senha
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha,
    }); // Passamos a senha criptografada e o restante dos dados

    return await this.usuarioRepository.save(usuario);
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.usuarioRepository.findOneBy({ email });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    if (!usuario) {
      throw new NotFoundException();
    }

    Object.assign(usuario, updateUsuarioDto);

    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);

    if (!usuario) {
      throw new NotFoundException();
    }

    return await this.usuarioRepository.remove(usuario);
  }
}
