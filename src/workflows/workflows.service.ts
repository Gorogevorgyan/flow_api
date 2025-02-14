import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private workflowsRepository: Repository<Workflow>,
  ) {
  }

  async create(workflow: Partial<Workflow>, user): Promise<Workflow> {
    const newWorkflow = this.workflowsRepository.create({ ...workflow, user });
    try {
     return await this.workflowsRepository.save(newWorkflow);
    } catch (e) {
      console.log(e);
      throw Error('ads');
    }
  }

  async findAll(userId: number): Promise<Workflow[]> {
    return this.workflowsRepository.find(
      { where: { user: { id: userId } }, relations: ['nodes'] } as FindManyOptions<Workflow>
    );
  }

  async findOne(id: number, userId: number): Promise<Workflow> {
    const workflow = await this.workflowsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['nodes'],
    } as FindOneOptions<Workflow>);
    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }
    return workflow;
  }

  async update(id: number, workflow: Partial<Workflow>, userId: number): Promise<Workflow> {
    const existingWorkflow = await this.workflowsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['nodes'],
    } as FindOneOptions<Workflow>);
    if (existingWorkflow) {
      await this.workflowsRepository.update(id, workflow);
      return this.findOne(id, userId);
    }
    throw new NotFoundException(`Action not allowed`);
  }

  async remove(id: number, userId: number): Promise<void> {
    const workflow = await this.workflowsRepository.findOne({
      where: { id, user: { id: userId } },
    } as FindOneOptions<Workflow>);
    if (workflow) {
      const result = await this.workflowsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Workflow with ID ${id} not found`);
      }
      return
    }
    throw new NotFoundException(`Action not allowed`);

  }
}