import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const highestSeqUser = await this.prisma.user.findFirst({
      orderBy: { seq: 'desc' },
      select: { seq: true },
    });

    const newSeq = highestSeqUser ? highestSeqUser.seq + 1 : 1;

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        seq: newSeq,
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
    });
    return user;
  }

  async getUserBoards(userId: string) {
    return this.prisma.board.findMany({
      where: { userId },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }
}
