import { Entity, StorableEntity } from '@project/shared/core';
import { Like } from '@project/shared/types';

export class LikeEntity extends Entity implements StorableEntity<Like> {
  public postId: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Like) {
    super();
    if (!data.postId || !data.userId) {
      throw new Error('postId and userId is required!');
    }

    this.populate(data);
  }

  public populate(data: Like) {
    this.id = data.id;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity(data);
  }

  static fromDto(userId: string, postId: string) {
    return new LikeEntity({
      userId,
      postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
