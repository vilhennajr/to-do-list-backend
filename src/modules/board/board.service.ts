import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async createBoard(userId: string, dto: CreateBoardDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const highestSeqBoard = await this.prisma.board.findFirst({
      orderBy: { seq: 'desc' },
      select: { seq: true },
    });

    const newSeq = highestSeqBoard ? highestSeqBoard.seq + 1 : 1;

    return this.prisma.board.create({
      data: {
        seq: newSeq,
        title: dto.title,
        user: { connect: { id: userId } },
      },
    });
  }

  async updateBoard(boardId: string, dto: UpdateBoardDto) {
    return this.prisma.board.update({
      where: { id: boardId },
      data: {
        title: dto.title,
      },
    });
  }

  async deleteBoard(boardId: string) {
    return this.prisma.board.delete({
      where: { id: boardId },
    });
  }

  async getBoardById(boardId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }
}
