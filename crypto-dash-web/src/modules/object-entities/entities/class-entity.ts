import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ObjectEntity } from './object-entity';

@Entity('class_entities')
export class ClassEntity {
  @PrimaryColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @ManyToMany(() => ObjectEntity, (o) => o.classes)
  objects: ObjectEntity[];
}
