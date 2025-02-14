import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './workflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow])],
  providers: [WorkflowsService],
  controllers: [WorkflowsController],
  exports: [WorkflowsService]
})
export class WorkflowsModule {}
