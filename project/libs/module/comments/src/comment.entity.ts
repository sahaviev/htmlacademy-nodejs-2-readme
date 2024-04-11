import { Entity } from '@project/shared/core';
import { Comment } from '@project/shared/types';
import { StorableEntity } from '@project/shared/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public message: string;
  public postId: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Comment) {
    super();
    if (!data.message || !data.postId || !data.userId) {
      throw new Error('Comment message, postId, userId is required!');
    }

    this.populate(data);
  }

  public populate(data: Comment) {
    this.id = data.id;
    this.message = data.message;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
