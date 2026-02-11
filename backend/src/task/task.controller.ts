import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    // For now, allow passing userId in body for testing, or default to temp.
    const userId = createTaskDto.userId || 'temp-user-id';
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  findAll() {
    return this.taskService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start tracking time for a task' })
  @ApiResponse({ status: 200, description: 'Task timer started.' })
  startTask(@Param('id') id: string) {
    return this.taskService.startTask(id);
  }

  @Post(':id/pause')
  @ApiOperation({ summary: 'Pause tracking time for a task' })
  @ApiResponse({ status: 200, description: 'Task timer paused.' })
  pauseTask(@Param('id') id: string) {
    return this.taskService.pauseTask(id);
  }

  @Post(':id/done')
  @ApiOperation({ summary: 'Mark a task as completed' })
  @ApiResponse({ status: 200, description: 'Task marked as done.' })
  completeTask(
    @Param('id') id: string,
    @Body('timeToSpend') timeToSpend: number,
  ) {
    return this.taskService.completeTask(id, timeToSpend);
  }
}
