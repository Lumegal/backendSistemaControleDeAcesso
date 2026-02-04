import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoOperacao {
  CARREGAMENTO = 1,
  DESCARREGAMENTO = 2,
}

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

  @Column()
  empresa: string;

  @Column()
  placa: string;

  @Column()
  motorista: string;

  @Column()
  rgCpf: string;

  @Column()
  celular: string;

  @Column({ nullable: true })
  numeroNotaFiscal: string;

  @Column({ type: 'int' })
  tipoOperacao: TipoOperacao;
}
