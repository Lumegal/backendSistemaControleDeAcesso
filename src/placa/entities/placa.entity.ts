import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Placa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;
}
