import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Tab5Page } from "./tab5.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Tab5PageRoutingModule } from "./tab5-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: "", component: Tab5Page }]),
    Tab5PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab5Page],
})
export class Tab5PageModule {}
