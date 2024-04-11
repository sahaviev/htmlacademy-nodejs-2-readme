import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('/')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.register(dto);
    return user.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.usersService.verifyUser(dto);
    return user.toPOJO();
  }

  @Post('logout')
  public async logout() {
    throw new Error('to be implemented');
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return user.toPOJO();
  }

  @Put(':id/password')
  public async updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    console.log(id);
    const user = await this.usersService.updatePassword(id, dto);
    return user.toPOJO();
  }

  @Put('/subscribe')
  public async subscribe(@Query('userId') userId: string) {
    console.log(userId);
    return userId;
  }
}
