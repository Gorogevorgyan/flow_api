import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Node } from './node.entity';
import { WorkflowsService } from '../workflows/workflows.service';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private nodesRepository: Repository<Node>,
    private readonly workflowsService: WorkflowsService
  ) {}

  async create(workflowId: number, node: Partial<Node>, userId: number): Promise<Node> {
    const workflow = await this.workflowsService.findOne(workflowId, userId);
    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${workflowId} not found`);
    }
    const newNode = this.nodesRepository.create({ ...node, workflow });
    return this.nodesRepository.save(newNode);
  }

  async findAll(workflowId: number): Promise<Node[]> {
    return this.nodesRepository.find({ where: { workflow: { id: workflowId } } } as FindManyOptions<Node> );
  }

  async findOne(workflowId: number, nodeId: number): Promise<Node> {
    const node = await this.nodesRepository.findOne({
      where: { id: nodeId, workflow: { id: workflowId } },
    } as FindOneOptions<Node>);
    if (!node) {
      throw new NotFoundException(`Node with ID ${nodeId} not found`);
    }
    return node;
  }

  async update(
    workflowId: number,
    nodeId: number,
    node: Partial<Node>,
  ): Promise<Node> {
    await this.nodesRepository.update(nodeId, node);
    return this.findOne(workflowId, nodeId);
  }

  async remove(workflowId: number, nodeId: number): Promise<void> {
    const result = await this.nodesRepository.delete(nodeId);
    if (result.affected === 0) {
      throw new NotFoundException(`Node with ID ${nodeId} not found`);
    }
  }
}