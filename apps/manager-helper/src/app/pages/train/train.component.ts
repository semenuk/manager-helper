import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BotService } from '../../services/bot.service';
import { Theme } from '@manager-helper/api-interfaces';
import { MatSelectionList } from '@angular/material';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'manager-helper-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {

  themes$: Observable<Theme[]>;

  constructor(private botService: BotService,
              private themeService: ThemeService,
              private router: Router) {
    this.themes$ = this.themeService.list();
  }

  addQuestion(theme: Theme, input: HTMLInputElement) {
    theme.questions.push(input.value);
    input.value = '';
    this.themeService.update(theme).subscribe();
  }

  delete(theme: Theme, selectionList: MatSelectionList) {
    theme.questions = selectionList.options
      .filter(option => !option.selected)
      .map(option => option.value);
    this.themeService.update(theme).subscribe();
  }

  edit(theme: Theme, event: Event) {
    event.preventDefault();
    this.router.navigate(['/edit', theme.id]).then();
  }

  train() {
    this.botService.train();
  }
}
