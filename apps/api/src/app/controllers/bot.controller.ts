import { Controller, Get, Query } from '@nestjs/common';
import { BotService } from '../services/bot.service';

@Controller('bot')
export class BotController {

  constructor(private botService: BotService) {
  }

  @Get('ask')
  async ask(@Query('question') question: string) {
    return this.botService.ask(question);
  }

  @Get('train')
  async train() {
    return await this.botService.train() ? 'Trained' : 'Fail';
  }
}
