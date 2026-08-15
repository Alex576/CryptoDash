import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from '../../crypto-engine/entities/subject';
import { Portfolio } from './portfolio';

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'portfolio_id' })
  portfolioId: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: Portfolio;

  @Column({ name: 'asset_id' })
  assetId: string;

  @ManyToOne(() => Subject, (asset) => asset.transactions)
  @JoinColumn({ name: 'asset_id' })
  asset: Subject;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('numeric', { precision: 18, scale: 8 })
  amount: number;

  @Column('numeric', { name: 'price_per_unit', precision: 18, scale: 8 })
  pricePerUnit: number;

  @CreateDateColumn({ name: 'executed_at' })
  executedAt: Date;
}
