import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LayoutModel } from '../models/layout-model';
import { LayoutType } from './layout-type';
import { Tool } from './tool';

@Entity('layout')
export class Layout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', default: {} })
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
}
