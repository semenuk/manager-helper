import { Component } from '@angular/core';
import { BotService } from './services/bot.service';

@Component({
  selector: 'manager-helper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private botService: BotService) {
  }

  train() {
    this.botService.train();
  }
}
