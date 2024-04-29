import { Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { LikeRdo, LikeResponseMessage, LikeService } from '@project/module/likes';
import { PostService } from '@project/module/posts';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(
    private readonly likeService: LikeService,
    private readonly postService: PostService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LikeResponseMessage.LikeCreated,
    type: LikeRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: LikeResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: LikeResponseMessage.UserAlreadyLikedThisPost,
  })
  @Post('/')
  public async like(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    const likeEntity = await this.likeService.createLike(postId, userId);

    return fillDto(LikeRdo, likeEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: LikeResponseMessage.LikeDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: LikeResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: LikeResponseMessage.UserDidntLikedThisPost,
  })
  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async dislike(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    await this.likeService.deleteLike(postId, userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikeResponseMessage.LikesFound,
    type: LikeRdo,
    isArray: true,
  })
  @Get('/')
  public async show(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikesByPostId(postId);
    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}
