import { Cargas } from 'src/cargas/entities/cargas.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Placa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @OneToMany(() => Cargas, (carga) => carga.placa)
  cargas: Cargas[];
}
