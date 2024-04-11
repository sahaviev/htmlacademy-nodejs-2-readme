import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
  ) { }

  public async getLikesByPostId(postId: string): Promise<LikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }

  public async createLike(postId: string, userId: string): Promise<LikeEntity> {
    const likeExists = await this.likeRepository.findByPostIdAndUserId(postId, userId);
    if (likeExists) {
      throw new ConflictException('User already liked this post');
    }

    const likeEntity = LikeEntity.fromDto(userId, postId);
    await this.likeRepository.save(likeEntity);

    return likeEntity;
  }

  public async deleteLike(postId: string, userId: string): Promise<void> {
    const likeEntity = await this.likeRepository.findByPostIdAndUserId(postId, userId);
    if (!likeEntity) {
      throw new ConflictException('User didn\'t liked this post');
    }
    await this.likeRepository.deleteById(likeEntity.id);
  }
}
