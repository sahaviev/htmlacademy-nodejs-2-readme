import { Like } from './like.type';
import { Tag } from './tag.type';
import { Comment } from './comment.type';

import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
import { User } from '@project/shared/core';

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
  tags: Tag[];
  likes: Like[];
  comments: Comment[];
};
