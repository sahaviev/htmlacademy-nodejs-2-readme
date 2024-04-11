import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
  constructor(entityFactory: CommentFactory) {
    super(entityFactory);
  }

  public async findByPostId(postId: string) {
    const entities = Array.from(this.entities.values());
    const comments = entities.filter((entity) => entity.postId === postId);
    return comments.map(this.entityFactory.create);
  }
}
