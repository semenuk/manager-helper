import { Injectable } from '@nestjs/common';
import VkBot from 'node-vk-bot-api';
import { BayesClassifier, PorterStemmerRu } from 'natural';
import { ThemeService } from './theme.service';


@Injectable()
export class BotService {

  private bot: any;
  private classifier: BayesClassifier;

  constructor(private themeService: ThemeService) {
    this.initClassifier();
    this.initBotVk();
  }

  async train() {
    try {
      const themes = await this.themeService.findAll();
      themes.forEach(theme =>
        theme.questions.forEach(question =>
          this.classifier.addDocument(question, theme.name)
        )
      );
      await this.classifier.train();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async ask(question: string) {
    const themeName = this.classifier.classify(question);
    const theme = await this.themeService.getByName(themeName);
    return theme.answer;
  }

  private initBotVk() {

    const token = process.env.TOKEN_VK;

    if (token) {

      this.bot = new VkBot(token);
      this.bot.event('message_new', (ctx) => {
        const question = ctx && ctx.message && ctx.message.body;
        if (question) {
          this.ask(question).then(answer => ctx.reply(answer))
        }
      });
      this.bot.startPolling(() => console.log('startPolling'));

    } else {
      console.error('TOKEN_VK is undefined', token);
    }
  }

  private initClassifier() {
    // @ts-ignore
    this.classifier = new BayesClassifier(PorterStemmerRu);
  }
}
