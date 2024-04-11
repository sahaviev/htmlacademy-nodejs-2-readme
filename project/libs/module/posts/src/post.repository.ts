import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  constructor(entityFactory: PostFactory) {
    super(entityFactory);
  }
}
