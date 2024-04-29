import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { CommentRequestMessage } from '../comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Great read! So much value packed into a concise piece. Thanks for sharing!',
  })
  public message: string;

  @ApiProperty({
    description: 'user id',
    example: '661c4efd846b53843bbbb31d',
  })
  @IsMongoId(
    {
      message: CommentRequestMessage.UserIdIsNotValid,
    }
  )
  public userId: string;
}
