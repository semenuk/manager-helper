import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme, ThemeDTO } from '@manager-helper/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly url = '/api/theme';
  private readonly themesSubject = new BehaviorSubject<Theme[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  list() {
    this.updateList();
    return this.themesSubject.asObservable();
  }

  get(id: string) {
    return this.httpClient.get<Theme>(this.url, {params: {id}});
  }

  create(dto: ThemeDTO) {
    return this.httpClient.post<Theme>(this.url + '/create', dto).pipe(
      tap(() => this.updateList())
    );
  }

  update(theme: Theme, update?: boolean) {
    return this.httpClient.post<Theme>(this.url + '/update', theme).pipe(
      tap(() => update && this.updateList())
    );
  }

  private updateList() {
    this.httpClient
      .get<Theme[]>(this.url + '/list')
      .subscribe((themes) => this.themesSubject.next(themes));
  }
}
