import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/data-access';

import { TagFactory } from './tag.factory';
import { TagEntity } from './tag.entity';
import { Tag } from '@project/shared/types';
import { PrismaClientService } from '@project/models';
import { PostEntity } from 'libs/module/posts/src/post.entity';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, Tag> {
  constructor(
    entityFactory: TagFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: TagEntity) {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async update(entity: TagEntity) {
    await this.client.tag.update({
      where: { id: entity.id },
      data: entity.toPOJO(),
    });
  }

  public async findAll() {
    const documents = await this.client.tag.findMany();
    return documents.map(this.entityFactory.create);
  }

  public async findById(id: string) {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByIds(ids: string[]) {
    const documents = await this.client.tag.findMany({
      where: {
        id: { in: ids },
      },
    });
    return documents.map(this.entityFactory.create);
  }

  public async deleteById(id: string) {
    await this.client.tag.delete({
      where: {
        id,
      },
    });
  }

  public async findByTitle(title: string) {
    const document = await this.client.tag.findFirst({
      where: {
        title,
      },
    });

    if (!document) {
      return null;
    }

    return this.entityFactory.create(document);
  }
}
