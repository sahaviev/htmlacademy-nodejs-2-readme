import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { Comment } from '@project/shared/types';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
