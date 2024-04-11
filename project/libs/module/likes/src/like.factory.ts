import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';

import { LikeEntity } from './like.entity';
import { Like } from '@project/shared/types';

@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  public create(data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}
