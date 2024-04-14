import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CreatePostDto, PostRdo, PostResponseMessage, PostService, UpdatePostDto } from '@project/module/posts';
import { TagService } from '@project/module/tags';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostResponseMessage.AllPosts,
    type: PostRdo,
    isArray: true,
  })
  @Get('/')
  public async index() {
    const postEntities = await this.postService.getAllPosts();
    return fillDto(PostRdo, postEntities.map((post) => post.toPOJO()));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound,
    type: PostRdo,
  })
  @Get('/:postId')
  public async show(@Param('postId') postId: string) {
    const postEntity = await this.postService.getPostById(postId);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated,
    type: PostRdo,
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const tags = tagEntities.map((tag) => tag.toPOJO());
    const postEntity = await this.postService.createPost(dto, tags);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated,
    type: PostRdo,
  })
  @Patch('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const postEntity = await this.postService.updatePost(postId, dto, tagEntities);
    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostResponseMessage.PostDeleted,
  })
  @Delete('/:postId')
  public async delete(@Param('postId') postId: string) {
    await this.postService.deletePost(postId);
  }
}
