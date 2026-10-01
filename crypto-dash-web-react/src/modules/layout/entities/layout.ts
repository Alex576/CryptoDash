import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { LayoutModel } from '../models/layout-model';
import { LayoutType } from './layout-type';
import { Tool } from './tool';

@Entity('layout')
@Tree('materialized-path')
export class Layout {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb', default: null, nullable: true })
  options: LayoutModel;

  @Column({ name: 'tool_id', type: 'int' })
  toolId: number;

  @ManyToOne(() => Tool, (tool) => tool.layouts)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @Column({ name: 'type_id', type: 'int' })
  typeId: number;

  @ManyToOne(() => LayoutType, (type) => type.layout)
  @JoinColumn({ name: 'type_id' })
  type: LayoutType;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Layout;

  @TreeChildren()
  children: Layout[];
}
