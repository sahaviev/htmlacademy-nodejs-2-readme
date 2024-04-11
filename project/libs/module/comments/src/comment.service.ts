import { Injectable } from '@nestjs/common';

import { Comment } from '@project/shared/types';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) { }

  public async getCommentsByPostId(postId: string) {
    return this.commentRepository.findByPostId(postId);
  }

  public async createComment(data: Comment) {
    const commentEntity = CommentEntity.fromObject(data);
    await this.commentRepository.save(commentEntity);
    return commentEntity;
  }
}
