import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export type Post = {
  id?: string;
  userId: string;
  postType: PostType;
  postState: PostState;
  createdAt?: Date;
  updatedAt?: Date;
  publishDate?: Date;
  creatorUserId?: string;
  originalPostId?: string;
  isReposted?: boolean;
  title?: string;
  link?: string;
  description?: string;
  photoUrl?: string;
  quoteText?: string;
  quoteAuthor?: string;
  announcement?: string;
  postText?: string;
  videoLink?: string;
};
