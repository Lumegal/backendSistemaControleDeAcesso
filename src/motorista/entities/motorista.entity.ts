import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Motorista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  rgCpf: string;

  @Column({ nullable: true })
  celular: string;
}
