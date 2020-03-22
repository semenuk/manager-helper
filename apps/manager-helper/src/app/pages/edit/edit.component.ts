import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Theme } from '@manager-helper/api-interfaces';
import { ThemeService } from '../../services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'manager-helper-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  name = new FormControl('');
  message = new FormControl('');

  private theme: Theme;
  private destroySubject = new Subject();

  constructor(private themeService: ThemeService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.paramMap
      .pipe(
        filter((paramMap) => paramMap.has('id')),
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => this.themeService.get(id)),
        filter((theme) => !!theme),
        takeUntil(this.destroySubject)
      )
      .subscribe((theme) => {
          this.theme = theme;
          this.name.patchValue(theme.name);
          this.message.patchValue(theme.answer);
        }
      );
  }

  save(event: Event) {
    event.preventDefault();
    if (this.theme) {
      this.theme.name = this.name.value;
      this.theme.answer = this.message.value;
    }

    iif(() => !!this.theme,
      this.themeService.update(this.theme, true),
      this.themeService.create({
        name: this.name.value,
        answer: this.message.value,
        questions: []
      })
    ).pipe(take(1)).subscribe(() =>
      this.router.navigateByUrl('/').then()
    );
  }
}
