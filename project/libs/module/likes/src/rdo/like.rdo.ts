import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LikeRdo {
  @ApiProperty({
    description: 'like id',
    example: '6172bf85-015a-473d-9507-7f1a3a8aa156',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'user id',
    example: '661c4efd846b53843bbbb31d',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'post id',
    example: '49afd4eb-ce03-426b-a436-c167f8185b22',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'created date',
    example: '2024-04-29T04:39:12.531Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'updated date',
    example: '2024-04-29T04:40:01.825Z',
  })
  @Expose()
  public updatedAt: string;
}
