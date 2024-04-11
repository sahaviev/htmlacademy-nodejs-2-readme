import { Module } from '@nestjs/common';

import { TagModule } from '@project/module/tags';

import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from 'libs/module/posts/src/post.factory';

@Module({
  imports: [TagModule],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
