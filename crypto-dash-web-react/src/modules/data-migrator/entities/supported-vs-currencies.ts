import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectHistory } from './subject-history';

@Entity('supported_vs_currencies')
export class SupportedVsCurrency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'currency' })
  currency: string;

  @OneToMany(() => SubjectHistory, (history) => history.currency)
  subjectHistory: SubjectHistory;
}
