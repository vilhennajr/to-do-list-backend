import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnDto, UpdateColumnDto } from './column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async createColumn(boardId: string, dto: CreateColumnDto) {
    const highestSeqColumn = await this.prisma.column.findFirst({
      orderBy: { seq: 'desc' },
      select: { seq: true },
    });

    const newSeq = highestSeqColumn ? highestSeqColumn.seq + 1 : 1;

    return this.prisma.column.create({
      data: {
        seq: newSeq,
        title: dto.title,
        board: { connect: { id: boardId } },
      },
    });
  }

  async updateColumn(columnId: string, dto: UpdateColumnDto) {
    return this.prisma.column.update({
      where: { id: columnId },
      data: {
        title: dto.title,
      },
    });
  }

  async deleteColumn(columnId: string) {
    return this.prisma.column.delete({
      where: { id: columnId },
    });
  }

  async getColumnById(columnId: string) {
    const column = await this.prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    return column;
  }
}
