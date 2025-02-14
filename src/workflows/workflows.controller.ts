import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { Workflow } from './workflow.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('workflows')
@UseGuards(AuthGuard('jwt') as Function)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {
  }

  @Post()
  create(@Request() req, @Body() workflow: Partial<Workflow>): Promise<Workflow> {
    return this.workflowsService.create(workflow, req.user);
  }

  @Get()
  findAll(@Request() req): Promise<Workflow[]> {
    return this.workflowsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: number): Promise<Workflow> {
    return this.workflowsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() workflow: Partial<Workflow>,
  ): Promise<Workflow> {
    return this.workflowsService.update(id, workflow, req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: number): Promise<void> {
    return this.workflowsService.remove(id, req.user.id);
  }
}