import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CreateTagDto, TagRdo, TagService, UpdateTagDto } from '@project/module/tags';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @Get('/')
  public async index() {
    const allTags = await this.tagService.getAllTags();
    return fillDto(TagRdo, allTags.map((tag) => tag.toPOJO()));
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const tagEntity = await this.tagService.getTagById(id);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const tagEntity = await this.tagService.createTag(dto);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const tagEntity = await this.tagService.updateTag(id, dto);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.tagService.deleteTag(id);
  }
}
