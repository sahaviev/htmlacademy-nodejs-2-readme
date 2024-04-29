import { Tag } from '@project/shared/types';
import { Entity } from '@project/shared/core';
import { StorableEntity } from '@project/shared/core';

export class TagEntity extends Entity implements StorableEntity<Tag> {
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    super();
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id;
    this.title = data.title;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  static fromObject(data: Tag) {
    return new TagEntity(data);
  }
}
