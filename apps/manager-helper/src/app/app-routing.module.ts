import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { TrainComponent } from './pages/train/train.component';
import { TestComponent } from './pages/test/test.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'train',
    pathMatch: 'full'
  },
  {
    path: 'train',
    component: TrainComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
