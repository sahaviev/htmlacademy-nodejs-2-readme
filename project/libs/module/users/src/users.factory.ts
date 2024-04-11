import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@project/shared/core';

import { UsersEntity } from './users.entity';

@Injectable()
export class UsersFactory implements EntityFactory<UsersEntity> {
  public create(data: AuthUser): UsersEntity {
    return new UsersEntity(data);
  }
}
