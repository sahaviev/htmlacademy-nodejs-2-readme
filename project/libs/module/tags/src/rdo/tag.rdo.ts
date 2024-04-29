import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'tag id',
    example: '0c6f5f6b-cd0d-4493-900b-ce66d9786139',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'tag title',
    example: 'system design',
  })
  @Expose()
  public title: string;
}
