import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [UserModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
