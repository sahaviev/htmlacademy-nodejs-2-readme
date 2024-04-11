import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
  ) { }

  public async getTagById(tagId: string): Promise<TagEntity> {
    return this.tagRepository.findById(tagId);
  }

  public async getAllTags() {
    return this.tagRepository.findAll();
  }

  public async getTagsByIds(tagIds: string[]) {
    const tagEntities = await this.tagRepository.findByIds(tagIds);

    if(tagIds.length !== tagEntities.length) {
      const tagMap:  Map<string, TagEntity> = new Map();
      tagEntities.forEach(tag => tagMap.set(tag.id, tag));

      const notFound = tagIds.filter((tagId) => !tagMap.has(tagId));
      if(notFound.length) {
        throw new NotFoundException(`Tags with ids: ${notFound.join(', ')} not found`);
      }
    }
    return tagEntities;
  }

  public async createTag(dto: CreateTagDto) {
    dto.title = dto.title.toLocaleLowerCase();

    const existsTag = await this.tagRepository.findByTitle(dto.title);

    if (existsTag) {
      throw new ConflictException(`Tag with title «${dto.title}» already exists`)
    }

    const tagEntity = new TagEntity(dto);
    await this.tagRepository.save(tagEntity);

    return tagEntity;
  }

  public async updateTag(tagId: string, dto: UpdateTagDto) {
    dto.title = dto.title.toLocaleLowerCase();

    const existsTag = await this.tagRepository.findByTitle(dto.title);

    if (existsTag) {
      throw new ConflictException(`Tag with title «${dto.title}» already exists`)
    }
    const tagEntity = new TagEntity(dto);
    try {
      await this.tagRepository.save(tagEntity);
      return tagEntity;
    } catch {
      throw new NotFoundException(`Tag with id «${tagId}» not found`);
    }
  }

  public async deleteTag(tagId: string) {
    try {
      await this.tagRepository.deleteById(tagId);
    } catch {
      throw new NotFoundException(`Tag with id «${tagId}» not found`);
    }
  }
}
