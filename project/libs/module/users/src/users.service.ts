import dayjs from 'dayjs';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserRole } from '@project/shared/core';

import { USER_EXISTS, USER_NOT_FOUND, USER_PASSWORD_WRONG } from './users.constant';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository
  ) {}

  public async register(dto: CreateUserDto): Promise<UsersEntity> {
    const {email, firstname, lastname, password, dateBirth} = dto;

    const user = {
      email,
      firstname,
      lastname,
      role:
      UserRole.User,
      avatar: '',
      dateOfBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existingUser = await this.userRepository
      .findByEmail(email);

    if (existingUser) {
      throw new ConflictException(USER_EXISTS);
    }

    const userEntity = await new UsersEntity(user)
      .setPassword(password)

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (!await user.comparePassword(password)) {
      throw new UnauthorizedException(USER_PASSWORD_WRONG);
    }

    return user;
  }

  public async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (!await user.comparePassword(dto.oldPassword)) {
      throw new UnauthorizedException(USER_PASSWORD_WRONG);
    }

    await user.setPassword(dto.newPassword);
    await this.userRepository.save(user);

    return user;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (! user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }
}
