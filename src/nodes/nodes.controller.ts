import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { Node } from './node.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('workflows/:workflowId/nodes')
@UseGuards(AuthGuard('jwt') as Function )
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(
    @Request() req,
    @Param('workflowId') workflowId: number,
    @Body() node: Partial<Node>,
  ): Promise<Node> {
    return this.nodesService.create(workflowId, node, req.user.sub);
  }

  @Get()
  findAll(@Param('workflowId') workflowId: number): Promise<Node[]> {
    return this.nodesService.findAll(workflowId);
  }

  @Get(':nodeId')
  findOne(
    @Param('workflowId') workflowId: number,
    @Param('nodeId') nodeId: number,
  ): Promise<Node> {
    return this.nodesService.findOne(workflowId, nodeId);
  }

  @Put(':nodeId')
  update(
    @Param('workflowId') workflowId: number,
    @Param('nodeId') nodeId: number,
    @Body() node: Partial<Node>,
  ): Promise<Node> {
    return this.nodesService.update(workflowId, nodeId, node);
  }

  @Delete(':nodeId')
  remove(
    @Param('workflowId') workflowId: number,
    @Param('nodeId') nodeId: number,
  ): Promise<void> {
    return this.nodesService.remove(workflowId, nodeId);
  }
}