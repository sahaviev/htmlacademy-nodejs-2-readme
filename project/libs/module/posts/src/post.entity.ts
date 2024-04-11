import { Post, PostState, PostType, PostFields, Tag } from '@project/shared/types';
import { Entity, StorableEntity } from '@project/shared/core';

import { LikeEntity } from '@project/module/likes';
import { CommentEntity } from '@project/module/comments';
import { TagEntity } from '@project/module/tags';

import { CreatePostDto } from './dto/create-post.dto';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public userId: string;
  public postType: PostType;
  public postState: PostState;
  public createdAt?: Date;
  public updatedAt?: Date;
  public publishDate?: Date;
  public isReposted: boolean;
  public creatorUserId?: string;
  public originalPostId?: string;
  public title?: string;
  public link?: string;
  public description?: string;
  public photoUrl?: string;
  public quoteText?: string;
  public quoteAuthor?: string;
  public announcement?: string;
  public postText?: string;
  public videoLink?: string;
  public tags: TagEntity[];
  public likes: LikeEntity[];
  public comments: CommentEntity[];

  constructor(data: Post) {
    super();
    this.populate(data);
  }

  public populate(data: Post) {
    this.id = data.id;
    this.userId = data.userId;
    this.postType = data.postType;
    this.postState = data.postState;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.publishDate = data.publishDate;
    this.creatorUserId = data.creatorUserId;
    this.originalPostId = data.originalPostId;
    this.isReposted = data.isReposted;
    this.title = data.title;
    this.link = data.link;
    this.description = data.description;
    this.photoUrl = data.photoUrl;
    this.quoteText = data.quoteText;
    this.quoteAuthor = data.quoteAuthor;
    this.announcement = data.announcement;
    this.postText = data.postText;
    this.videoLink = data.videoLink;
    this.tags = data.tags.map(TagEntity.fromObject);
    this.likes = data.likes.map(LikeEntity.fromObject);
    this.comments = data.comments.map(CommentEntity.fromObject);

    return this;
  }

  public toPOJO(): Post {
    const fields = Object.values(PostFields).filter((field) => this[field] !== undefined);

    const post = {
      id: this.id,
      userId: this.userId,
      postType: this.postType,
      postState: this.postState,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isReposted: this.isReposted,
      publishDate: this.publishDate,
      tags: this.tags.map((tag) => tag.toPOJO()),
      comments: this.comments.map((comment) => comment.toPOJO()) ?? [],
      likes: this.likes.map((like) => like.toPOJO()),
    };

    if(this.isReposted) {
      post['creatorUserId'] = this.creatorUserId;
      post['originalPostId'] = this.originalPostId;
    }

    for(const property of fields) {
      post[property] = this[property];
    }

    return post;
  }

  static fromDto(dto: CreatePostDto, tags: Tag[]): PostEntity {
    return new PostEntity({
      userId: dto.userId,
      postState: undefined,
      postType: dto.postType,
      title: dto.title,
      videoLink: dto.videoLink,
      announcement: dto.announcement,
      postText: dto.postText,
      link: dto.link,
      description: dto.description,
      photoUrl: dto.photoUrl,
      quoteText: dto.quoteText,
      quoteAuthor: dto.quoteAuthor,
      comments: [],
      likes: [],
      tags,
    });
  }
}
