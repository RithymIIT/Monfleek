import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingOrderDetailsPageRoutingModule } from './upcoming-order-details-routing.module';

import { UpcomingOrderDetailsPage } from './upcoming-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingOrderDetailsPageRoutingModule
  ],
  declarations: [UpcomingOrderDetailsPage]
})
export class UpcomingOrderDetailsPageModule {}
