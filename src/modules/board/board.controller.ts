import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post(':userId')
  createBoard(@Param('userId') userId: string, @Body() dto: CreateBoardDto) {
    return this.boardService.createBoard(userId, dto);
  }

  @Put(':boardId')
  updateBoard(@Param('boardId') boardId: string, @Body() dto: UpdateBoardDto) {
    return this.boardService.updateBoard(boardId, dto);
  }

  @Delete(':boardId')
  deleteBoard(@Param('boardId') boardId: string) {
    return this.boardService.deleteBoard(boardId);
  }

  @Get(':boardId')
  getBoardById(@Param('boardId') boardId: string) {
    return this.boardService.getBoardById(boardId);
  }
}
