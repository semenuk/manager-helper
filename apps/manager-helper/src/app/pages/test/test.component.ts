import { Component, OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'manager-helper-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  answer$ = new BehaviorSubject<string>('');

  constructor(private botService: BotService) { }

  ngOnInit() {
  }

  ask(question: string) {
    this.botService
      .ask(question)
      .subscribe((answer) => this.answer$.next(answer))
  }
}
