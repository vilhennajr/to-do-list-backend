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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':columnId')
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criado com sucesso.' })
  createTask(@Param('columnId') columnId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(columnId, dto);
  }

  @Put(':taskId')
  @ApiOperation({ summary: 'Atualizar um tarefa existente' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizado com sucesso.' })
  updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(taskId, dto);
  }

  @Put(':taskId/move')
  @ApiOperation({ summary: 'Mover um tarefa existente' })
  @ApiResponse({ status: 200, description: 'Tarefa movida com sucesso.' })
  moveTask(
    @Param('taskId') taskId: string,
    @Body('newColumnId') newColumnId: string,
  ) {
    return this.taskService.moveTask(taskId, newColumnId);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Excluir um tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa excluído com sucesso.' })
  deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Listar todos os tarefas do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas.' })
  getBoardById(@Param('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }
}
