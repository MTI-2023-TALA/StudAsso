import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { Base } from './entities/base.entity'
import { IbaseService } from './ibase.service';

@Controller('base')
export class BaseController<Entity extends Base> {
  constructor(private readonly IBaseService: IbaseService<Entity, CreateBaseDto, UpdateBaseDto>) {}

  @Post()
  create(@Body() createBaseDto: CreateBaseDto) : Promise<Entity> {
    return this.IBaseService.create(createBaseDto);
  }

  @Get()
  findAll() : Promise<Entity[]> {
    return this.IBaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Entity> {
    return this.IBaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) : Promise<UpdateResult> {
    return this.IBaseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<DeleteResult> {
    return this.IBaseService.remove(+id);
  }
}
