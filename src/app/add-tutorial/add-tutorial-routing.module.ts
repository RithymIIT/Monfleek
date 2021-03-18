import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTutorialPage } from './add-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: AddTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTutorialPageRoutingModule {}
