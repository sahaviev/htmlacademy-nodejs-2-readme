import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { CreateTagDto, TagRdo, TagResponseMessage, TagService, UpdateTagDto } from '@project/module/tags';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: TagResponseMessage.AllTags,
    type: TagRdo,
    isArray: true,
  })
  @Get('/')
  public async index() {
    const allTags = await this.tagService.getAllTags();
    return fillDto(TagRdo, allTags.map((tag) => tag.toPOJO()));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: TagResponseMessage.TagFound,
    type: TagRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagResponseMessage.TagNotFound,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const tagEntity = await this.tagService.getTagById(id);
    if (!tagEntity) {
      throw new NotFoundException(`Tag with id «${id}» not found`);
    }

    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TagResponseMessage.TagCreated,
    type: TagRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TagResponseMessage.TagAlreadyExists,
  })
  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const tagEntity = await this.tagService.createTag(dto);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: TagResponseMessage.TagUpdated,
    type: TagRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TagResponseMessage.TagNotFound,
    type: TagRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TagResponseMessage.TagAlreadyExists,
    type: TagRdo,
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const tagEntity = await this.tagService.updateTag(id, dto);
    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TagResponseMessage.TagDeleted,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.tagService.deleteTag(id);
  }
}
