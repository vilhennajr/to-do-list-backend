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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Criar um novo quadro' })
  @ApiResponse({ status: 201, description: 'Quadro criado com sucesso.' })
  createBoard(@Param('userId') userId: string, @Body() dto: CreateBoardDto) {
    return this.boardService.createBoard(userId, dto);
  }

  @Put(':boardId')
  @ApiOperation({ summary: 'Atualizar um quadro existente' })
  @ApiResponse({ status: 200, description: 'Quadro atualizado com sucesso.' })
  updateBoard(@Param('boardId') boardId: string, @Body() dto: UpdateBoardDto) {
    return this.boardService.updateBoard(boardId, dto);
  }

  @Delete(':boardId')
  @ApiOperation({ summary: 'Excluir um quadro' })
  @ApiResponse({ status: 204, description: 'Quadro excluído com sucesso.' })
  deleteBoard(@Param('boardId') boardId: string) {
    return this.boardService.deleteBoard(boardId);
  }

  @Get(':boardId')
  @ApiOperation({ summary: 'Listar todos os quadros do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de quadros.' })
  getBoardById(@Param('boardId') boardId: string) {
    return this.boardService.getBoardById(boardId);
  }
}
