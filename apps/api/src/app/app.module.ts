import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeController } from './controllers/theme.controller';
import { ThemeService } from './services/theme.service';
import { ThemeEntity } from './model/theme.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ThemeEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ThemeEntity])
  ],
  controllers: [AppController, BotController, ThemeController],
  providers: [AppService, BotService, ThemeService]
})
export class AppModule {}
