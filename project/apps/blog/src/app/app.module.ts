import { Module } from '@nestjs/common';

import { PostModule } from '@project/module/posts';
import { CommentModule } from '@project/module/comments';
import { LikeModule } from '@project/module/likes';
import { TagModule } from '@project/module/tags';

import { PostsController } from 'apps/blog/src/app/posts.controller';
import { CommentsController } from 'apps/blog/src/app/comments.controller';
import { LikesController } from 'apps/blog/src/app/likes.controller';
import { TagsController } from 'apps/blog/src/app/tags.controller';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [TagModule, LikeModule, CommentModule, PostModule, PrismaClientModule],
  controllers: [PostsController, CommentsController, LikesController, TagsController],
})
export class AppModule {}
