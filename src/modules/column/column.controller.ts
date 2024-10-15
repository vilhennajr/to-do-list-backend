import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto, UpdateColumnDto } from './column.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post(':boardId')
  @ApiOperation({ summary: 'Criar uma nova coluna' })
  @ApiResponse({ status: 201, description: 'Coluna criado com sucesso.' })
  createColumn(
    @Param('boardId') boardId: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.columnService.createColumn(boardId, dto);
  }

  @Put(':columnId')
  @ApiOperation({ summary: 'Atualizar uma coluna existente' })
  @ApiResponse({ status: 201, description: 'Coluna atualizado com sucesso.' })
  updateColumn(
    @Param('columnId') columnId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(columnId, dto);
  }

  @Delete(':columnId')
  @ApiOperation({ summary: 'Excluir uma coluna' })
  @ApiResponse({ status: 204, description: 'Coluna excluído com sucesso.' })
  deleteColumn(@Param('columnId') columnId: string) {
    return this.columnService.deleteColumn(columnId);
  }

  @Get(':columnId')
  @ApiOperation({ summary: 'Listar todas os coluna do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de coluna.' })
  getBoardById(@Param('columnId') columnId: string) {
    return this.columnService.getColumnById(columnId);
  }
}
