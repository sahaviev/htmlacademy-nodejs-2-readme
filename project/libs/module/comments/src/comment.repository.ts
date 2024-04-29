import { Injectable } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/data-access';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { Comment } from '@project/shared/types';
import { PrismaClientService } from '@project/models';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    entityFactory: CommentFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity) {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findByPostId(postId: string) {
    const documents = await this.client.comment.findMany({
      where: {
        postId,
      },
    });

    return documents.map(this.createEntityFromDocument);
  }
}
