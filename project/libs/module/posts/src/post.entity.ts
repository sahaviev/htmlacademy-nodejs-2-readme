import { Post, PostFields, PostState, PostType, Tag } from '@project/shared/types';
import { Entity, StorableEntity } from '@project/shared/core';

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

    return this;
  }

  public toPOJO(): Post {
    const post = {
      id: this.id,
      userId: this.userId,
      postType: this.postType,
      postState: this.postState,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isReposted: this.isReposted,
      publishDate: this.publishDate,
      creatorUserId: this.creatorUserId ? this.creatorUserId : null,
      originalPostId: this.originalPostId ? this.originalPostId : null,
    };


    for(const property of Object.values(PostFields)) {
      post[property] = this[property] ? this[property] : null;
    }

    return post;
  }

  static fromDto(dto: CreatePostDto, tags: Tag[]): PostEntity {
    return new PostEntity({
      userId: dto.userId,
      postState: PostState.Published,
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
    });
  }
}
