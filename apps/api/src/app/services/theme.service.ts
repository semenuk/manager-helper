import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeEntity } from '../model/theme.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Theme } from '@manager-helper/api-interfaces';

@Injectable()
export class ThemeService {

  constructor(@InjectRepository(ThemeEntity) private themeRepository: Repository<ThemeEntity>) {
  }

  async get(id: string) {
    const entity = await this.themeRepository.findOne(id);
    return this.toTheme(entity);
  }

  async getByName(name: string) {
    return this.themeRepository.findOne({where: {name}})
  }

  async findAll(): Promise<Theme[]> {
    const entities = await this.themeRepository.find();
    return entities.map((entity) => this.toTheme(entity));
  }

  async create(theme: Theme): Promise<Theme> {
    const entity = await this.themeRepository.save(this.toEntity(theme));
    return this.toTheme(entity);
  }

  async update(theme: Theme): Promise<UpdateResult> {
    return this.themeRepository.update(theme.id, this.toEntity(theme));
  }

  async delete(id): Promise<DeleteResult> {
    return this.themeRepository.delete(id);
  }

  private toTheme(entity: ThemeEntity): Theme {
    const questions = entity.questions ? entity.questions.split('_') : [];
    return {...entity, questions}
  }

  private toEntity(theme: Theme): ThemeEntity {
    return {...theme, questions: theme.questions.join('_')};
  }
}
