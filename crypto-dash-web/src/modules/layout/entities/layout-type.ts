import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Layout } from './layout';

@Entity('layout_type')
export class LayoutType {
  @PrimaryColumn({ name: 'id', type: 'int' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Layout, (layout) => layout.type)
  layout: Layout[];
}
