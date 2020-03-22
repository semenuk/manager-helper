import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ThemeService } from '../services/theme.service';
import { Theme } from '@manager-helper/api-interfaces';
import { UpdateResult } from 'typeorm';

@Controller('theme')
export class ThemeController {

  constructor(private themeService: ThemeService) {
  }

  @Get()
  async get(@Query('id') id: string): Promise<Theme> {
    return this.themeService.get(id);
  }

  @Get('list')
  async list(): Promise<Theme[]> {
    return this.themeService.findAll();
  }

  @Post('create')
  async create(@Body() themeData: Theme): Promise<Theme> {
    return this.themeService.create(themeData);
  }

  @Post('update')
  async update(@Body() themeData: Theme): Promise<UpdateResult> {
    return this.themeService.update(themeData);
  }

}
