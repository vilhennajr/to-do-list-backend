import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BoardModule } from './modules/board/board.module';
import { ColumnModule } from './modules/column/column.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [PrismaModule, UserModule, BoardModule, ColumnModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
