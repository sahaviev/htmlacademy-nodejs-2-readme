import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto, LoginUserDto, UpdatePasswordDto, UserService } from '@project/module/users';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService
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
    const user = await this.usersService.updatePassword(id, dto);
    return user.toPOJO();
  }

  @Put('/subscribe')
  public async subscribe(@Query('userId') userId: string) {
    return userId;
  }
}
