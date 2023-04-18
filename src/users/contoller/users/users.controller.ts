import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/Dto/CreateUserDto';
import { UserNOtFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor) //filtering password field
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return new SerializedUser(user); //filtering password field
  }

  @UseInterceptors(ClassSerializerInterceptor) //filtering password field
  @UseFilters(HttpExceptionFilter)
  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (!user) throw new UserNOtFoundException('User not found', 404);
    return new SerializedUser(user); //filtering password field
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
