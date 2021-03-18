import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingOrderDetailsPage } from './upcoming-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingOrderDetailsPageRoutingModule {}
