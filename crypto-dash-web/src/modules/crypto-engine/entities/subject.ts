import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from '../../portfolios/entities/transaction';
import { SubjectData } from './subject-data';

@Entity('assets')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coinId: string;

  @Column()
  symbol: string; // Например: BTC, ETH, SOL

  @Column({ name: 'full_name' })
  fullName: string;

  @Column('numeric', { name: 'current_price_usd', precision: 18, scale: 8, default: 0 })
  currentPriceUsd: number;

  @UpdateDateColumn({ name: 'last_updated' })
  lastUpdated: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];

  @OneToOne(() => SubjectData, (subjectData) => subjectData.subject)
  @JoinColumn({ name: 'subject_data_id' })
  subjectData: SubjectData;
}
