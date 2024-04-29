import { Injectable } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/data-access';

import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';
import { Like } from '@project/shared/types';
import { PrismaClientService } from '@project/models';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    entityFactory: LikeFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: LikeEntity) {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findByPostId(postId: string) {
    const documents = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return documents.map(this.createEntityFromDocument);
  }

  public async findByPostIdAndUserId(postId: string, userId: string) {
    const document = await this.client.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string) {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
