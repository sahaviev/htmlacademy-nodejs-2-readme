import { Expose } from 'class-transformer';

import { PostState, PostType } from '@project/shared/types';
import { LikeRdo } from '@project/module/likes';
import { TagRdo } from '@project/module/tags';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public tags: TagRdo[];

  @Expose()
  public postType: PostType;

  @Expose()
  public postState: PostState;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public isReposted: boolean;

  @Expose()
  public creatorUserId?: string;

  @Expose()
  public originalPostId?: string;

  @Expose()
  public publishDate?: string;

  @Expose()
  public link?: string;

  @Expose()
  public photoUrl?: string;

  @Expose()
  public quoteAuthor?: string;

  @Expose()
  public announcement?: string;

  @Expose()
  public videoLink?: string;

  @Expose()
  public comments: string;

  @Expose()
  public likes: LikeRdo[];
}
