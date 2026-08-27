import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from '../../crypto-engine/entities/subject';
import { SupportedVsCurrency } from './supported-vs-currencies';

@Entity('subject_histories')
export class SubjectHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  optionJson: string;

  @UpdateDateColumn({ name: 'last_updated' })
  lastUpdated: Date;

  @Column({ name: 'subject_id' })
  subjectId: string;

  @ManyToOne(() => Subject, (subject) => subject.histories)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'currency_id' })
  currencyId: string;

  @ManyToOne(() => SupportedVsCurrency, (curr) => curr.currency)
  @JoinColumn({ name: 'currency_id' })
  currency: SupportedVsCurrency[];
}
