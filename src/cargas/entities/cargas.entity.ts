import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Motorista } from '../../motorista/entities/motorista.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

export enum TipoOperacao {
  CARREGAMENTO = 1,
  DESCARREGAMENTO = 2,
}

@Index(['chegada', 'empresa', 'motorista', 'tipoOperacao'], { unique: true })
@Entity()
export class Cargas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  chegada: Date;

  @Column({ type: 'timestamp', nullable: true })
  entrada: Date;

  @Column({ type: 'timestamp', nullable: true })
  saida: Date;

  @ManyToOne(() => Empresa, (empresa) => empresa.cargas, {
    eager: true,
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column()
  placa: string;

  @Column({ nullable: true })
  numeroNotaFiscal: string;

  @Column({ type: 'int' })
  tipoOperacao: TipoOperacao;

  @ManyToOne(() => Motorista, (motorista) => motorista.cargas, {
    eager: true, // já traz o motorista junto
  })
  @JoinColumn({ name: 'motoristaId' })
  motorista: Motorista;
}
