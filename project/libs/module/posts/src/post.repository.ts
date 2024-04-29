import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/data-access';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PrismaClientService } from '@project/models';
import { Post, PostState, PostType } from '@project/shared/types';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostEntity) {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findById(id: string) {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      postType: document.postType as PostType,
      postState: document.postType as PostState,
    });
  }
}
