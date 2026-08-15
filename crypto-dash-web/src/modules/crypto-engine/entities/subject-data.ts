import { Column, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from './subject';

@Entity('subject_data')
export class SubjectData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  optionJson: string;

  @UpdateDateColumn({ name: 'last_updated' })
  lastUpdated: Date;

  @OneToOne(() => Subject, (subject) => subject.subjectData)
  subject: Subject;
}
