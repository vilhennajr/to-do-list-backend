import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':columnId')
  createTask(@Param('columnId') columnId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(columnId, dto);
  }

  @Put(':taskId')
  updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(taskId, dto);
  }

  @Put(':taskId/move')
  moveTask(
    @Param('taskId') taskId: string,
    @Body('newColumnId') newColumnId: string,
  ) {
    return this.taskService.moveTask(taskId, newColumnId);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }

  @Get(':taskId')
  getBoardById(@Param('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }
}
