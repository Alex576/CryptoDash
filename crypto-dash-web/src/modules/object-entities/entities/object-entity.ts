import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassEntity } from './class-entity';

@Entity('object_entities')
export class ObjectEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'class_id' })
  classId: number;

  @ManyToMany(() => ClassEntity, (x) => x.objects, { cascade: true })
  @JoinTable({ name: 'class_id' })
  classes: ClassEntity[];
}
