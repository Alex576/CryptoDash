import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Layout } from './layout';

@Entity('tool')
export class Tool {
  @PrimaryColumn({ name: 'id', type: 'int' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Layout, (layout) => layout.tool)
  layouts: Layout[];
}
