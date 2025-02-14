import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './workflows/workflow.entity';
import { Node } from './nodes/node.entity';
import { User } from './auth/user.entity';
import { WorkflowsModule } from './workflows/workflows.module';
import { NodesModule } from './nodes/nodes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'workflow',
      password: process.env.DB_PASSWORD || 'workflow_db_pass',
      database: process.env.DB_DATABASE || 'workflow_db',
      entities: [Workflow, Node, User],
      synchronize: true,
    }),
    WorkflowsModule,
    NodesModule,
    AuthModule,
  ],
})
export class AppModule {}