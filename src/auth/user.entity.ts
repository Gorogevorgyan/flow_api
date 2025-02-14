import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Node } from '../nodes/node.entity';
import { Workflow } from '../workflows/workflow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Workflow, (workflow) => workflow.user)
  workflows: Workflow[];
}