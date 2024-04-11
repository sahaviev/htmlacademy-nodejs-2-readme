import { Injectable, NotFoundException } from '@nestjs/common';

import { Tag } from '@project/shared/types';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { TagEntity } from '@project/module/tags';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }

  public async getPostById(id: string) {
    return this.postRepository.findById(id);
  }

  public async getAllPosts() {
    return this.postRepository.findAll();
  }

  public async createPost(dto: CreatePostDto, tags: Tag[]) {
    const postEntity = PostEntity.fromDto(dto, tags);
    await this.postRepository.save(postEntity);
    return postEntity;
  }

  public async updatePost(postId: string, dto: UpdatePostDto, tags: TagEntity[]) {
    const postEntity = await this.postRepository.findById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }
    postEntity.postType = dto.postType;
    postEntity.title = dto.title;
    postEntity.videoLink = dto.videoLink;
    postEntity.announcement = dto.announcement;
    postEntity.link = dto.link;
    postEntity.description = dto.description;
    postEntity.photoUrl = dto.photoUrl;
    postEntity.quoteText = dto.quoteText;
    postEntity.quoteAuthor = dto.quoteAuthor;
    postEntity.tags = tags;

    await this.postRepository.update(postEntity);

    return postEntity;
  }

  public async deletePost(postId: string) {
    const postEntity = await this.postRepository.findById(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    return await this.postRepository.deleteById(postId);
  }
}
