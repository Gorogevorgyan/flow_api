import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Workflow } from '../workflows/workflow.entity';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  position_x: number;

  @Column()
  position_y: number;

  @Column('jsonb')
  connections: object;

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes)
  workflow: Workflow;
}