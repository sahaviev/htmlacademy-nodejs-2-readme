import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'comment message',
    example: 'Great read! So much value packed into a concise piece. Thanks for sharing!',
  })
  @Expose()
  public message: string;

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
    example: '2024-04-29T04:23:32.232Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'updated date',
    example: '2024-04-29T04:24:56.124Z',
  })
  @Expose()
  public updatedAt: string;
}
