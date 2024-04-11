import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CommentRdo, CommentService, CreateCommentDto } from '@project/module/comments';
import { PostService } from '@project/module/posts';

@ApiTags('Comments')
@Controller('/posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Post('/')
  public async create(@Body() dto: CreateCommentDto, @Param('postId') postId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    const commentEntity = await this.commentService.createComment({
      ...dto,
      postId,
    });
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const postEntity = await this.postService.getPostById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    const commentEntities = await this.commentService.getCommentsByPostId(postId);
    return fillDto(CommentRdo, commentEntities.map((comment) => comment.toPOJO()));
  }
}
