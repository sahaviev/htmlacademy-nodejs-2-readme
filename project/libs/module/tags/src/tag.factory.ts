import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { Tag } from '@project/shared/types';

import { TagEntity } from './tag.entity';

@Injectable()
export class TagFactory implements EntityFactory<TagEntity> {
  public create(data: Tag): TagEntity {
    return new TagEntity(data);
  }
}
