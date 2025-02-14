import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Node } from '../nodes/node.entity';
import { User } from '../auth/user.entity'
@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Node, (node) => node.workflow)
  nodes: Node[];

  @ManyToOne(() => User, (user) => user.workflows)
  user: User;
}