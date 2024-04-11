import { PostType } from '@project/shared/types';

export class UpdatePostDto {
  public tags?: string[];

  public postType?: PostType;

  public title?: string;

  public videoLink?: string;

  public announcement?: string;

  public postText?: string;

  public link?: string;

  public description?: string;

  public photoUrl?: string;

  public quoteText?: string;

  public quoteAuthor?: string;
}
