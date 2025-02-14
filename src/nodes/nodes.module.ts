import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './node.entity';
import { WorkflowsModule } from '../workflows/workflows.module';

@Module({
  imports: [WorkflowsModule, TypeOrmModule.forFeature([Node])],
  providers: [NodesService],
  controllers: [NodesController]
})
export class NodesModule {}
