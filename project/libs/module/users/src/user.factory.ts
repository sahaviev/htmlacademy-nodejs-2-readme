import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@project/shared/core';

import { UserEntity } from 'libs/module/users/src/user.entity';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(data: AuthUser): UserEntity {
    return new UserEntity(data);
  }
}
