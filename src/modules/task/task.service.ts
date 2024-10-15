import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(columnId: string, dto: CreateTaskDto) {
    const highestSeqTask = await this.prisma.task.findFirst({
      orderBy: { seq: 'desc' },
      select: { seq: true },
    });

    const newSeq = highestSeqTask ? highestSeqTask.seq + 1 : 1;

    return this.prisma.task.create({
      data: {
        seq: newSeq,
        title: dto.title,
        description: dto.description,
        column: { connect: { id: columnId } },
      },
    });
  }

  async updateTask(taskId: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
    });
  }

  async moveTask(taskId: string, newColumnId: string) {
    try {
      return this.prisma.task.update({
        where: { id: taskId },
        data: {
          column: { connect: { id: newColumnId } },
        },
      });
    } catch (err) {
      return err;
    }
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  async getTaskById(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
