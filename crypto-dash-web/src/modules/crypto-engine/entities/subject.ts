import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubjectHistory } from '../../data-migrator/entities/subject-history';
import { Transaction } from '../../portfolios/entities/transaction';
import { SubjectData } from './subject-data';

@Entity('subjects')
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

  @OneToMany(() => Transaction, (transaction) => transaction.subject, { cascade: true })
  transactions: Transaction[];

  @OneToOne(() => SubjectData, (subjectData) => subjectData.subject)
  @JoinColumn({ name: 'subject_data_id' })
  subjectData: SubjectData;

  @OneToMany(() => SubjectHistory, (history) => history.subject, { cascade: true })
  histories: SubjectHistory[];
}
