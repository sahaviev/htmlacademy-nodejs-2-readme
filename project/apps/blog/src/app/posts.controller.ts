import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CreatePostDto, PostRdo, PostService, UpdatePostDto } from '@project/module/posts';
import { TagService } from '@project/module/tags';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
  ) {}

  @Get('/')
  public async index() {
    const postEntities = await this.postService.getAllPosts();
    return fillDto(PostRdo, postEntities.map((post) => post.toPOJO()));
  }

  @Get('/:postId')
  public async show(@Param('postId') postId: string) {
    const postEntity = await this.postService.getPostById(postId);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const tags = tagEntities.map((tag) => tag.toPOJO());
    const postEntity = await this.postService.createPost(dto, tags);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Patch('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const postEntity = await this.postService.updatePost(postId, dto, tagEntities);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Delete('/:postId')
  public async delete(@Param('postId') postId: string) {
    await this.postService.deletePost(postId);
  }
}
