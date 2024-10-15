import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get(':userId/boards')
  @ApiOperation({ summary: 'Listar todos o quadro do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de usuário.' })
  getUserBoards(@Param('userId') userId: string) {
    return this.userService.getUserBoards(userId);
  }
}
