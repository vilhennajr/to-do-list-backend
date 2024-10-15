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

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post(':boardId')
  createColumn(
    @Param('boardId') boardId: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.columnService.createColumn(boardId, dto);
  }

  @Put(':columnId')
  updateColumn(
    @Param('columnId') columnId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(columnId, dto);
  }

  @Delete(':columnId')
  deleteColumn(@Param('columnId') columnId: string) {
    return this.columnService.deleteColumn(columnId);
  }

  @Get(':columnId')
  getBoardById(@Param('columnId') columnId: string) {
    return this.columnService.getColumnById(columnId);
  }
}
