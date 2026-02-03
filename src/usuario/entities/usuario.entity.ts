import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column()
  nivelDeAcesso: number;

  @Column()
  ativo: boolean;
}
