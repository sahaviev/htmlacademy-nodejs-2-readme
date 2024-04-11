import { Injectable } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { Post } from '@project/shared/types';
import { EntityFactory } from '@project/shared/core';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(data: Post): PostEntity {
    return new PostEntity(data);
  }
}
