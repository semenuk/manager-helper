import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@manager-helper/api-interfaces';

@Component({
  selector: 'manager-helper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
