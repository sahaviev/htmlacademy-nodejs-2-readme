import { Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { LikeRdo, LikeService } from '@project/module/likes';
import { PostService } from '@project/module/posts';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(
    private readonly likeService: LikeService,
    private readonly postService: PostService,
  ) {}

  @Post('/')
  public async like(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    const likeEntity = await this.likeService.createLike(postId, userId);

    return fillDto(LikeRdo, likeEntity.toPOJO());
  }

  @Delete('/')
  public async dislike(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    await this.likeService.deleteLike(postId, userId);
  }

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikesByPostId(postId);
    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}
