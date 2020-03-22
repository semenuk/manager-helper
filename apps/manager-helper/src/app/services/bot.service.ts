import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '@manager-helper/api-interfaces';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  private loaded = false;
  private selectedSubject = new BehaviorSubject<Theme>(null);

  private readonly url = '/api/bot';

  constructor(private http: HttpClient,
              private themeService: ThemeService) { }

  ask(question: string): Observable<string> {
    return this.http.get(this.url + '/ask', {params: {question}, responseType: 'text'});
  }

  train() {
    this.http.get(this.url + '/train', {responseType: 'text'}).subscribe();
  }
}
