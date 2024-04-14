import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType } from '@project/shared/types';
import { LikeRdo } from '@project/module/likes';
import { TagRdo } from '@project/module/tags';

export class PostRdo {
  @ApiProperty({
    description: 'post id',
    example: '111',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'user id',
    example: '13',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'tags ',
    type: TagRdo,
    isArray: true,
  })
  @Expose()
  public tags: TagRdo[];

  @ApiProperty({
    description: 'post type',
    enum: PostType,
  })
  @Expose()
  public postType: PostType;

  @ApiProperty({
    description: 'post state',
    enum: PostState,
  })
  @Expose()
  public postState: PostState;

  @ApiProperty({
    description: 'date when post was created',
    example: '2024-04-13T14:42:49.162Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'date when post was updated',
    example: '2024-04-13T14:42:49.162Z',
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'date when post was published',
    example: '2024-04-13T14:42:49.162Z',
  })
  @Expose()
  public publishDate?: string;

  @ApiProperty({
    description: 'Flag if post was reposted - true',
    type: Boolean,
  })
  @Expose()
  public isReposted: boolean;

  @ApiProperty({
    description: 'user id of user who created post if it is reposted post',
    example: '13',
  })
  @Expose()
  public creatorUserId?: string;

  @ApiProperty({
    description: 'post id of original post if it is reposted post',
    example: '111',
  })
  @Expose()
  public originalPostId?: string;

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
