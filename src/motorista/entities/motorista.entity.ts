import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cargas } from '../../cargas/entities/cargas.entity';

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

  @OneToMany(() => Cargas, (carga) => carga.motorista)
  cargas: Cargas[];
}
