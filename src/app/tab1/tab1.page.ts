import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SearchPage } from "../search/search.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  categories: string = "all";

  constructor(public modalController: ModalController) {
    localStorage.getItem("userid");
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      cssClass: "searchPage",
      swipeToClose: true,
    });
    return await modal.present();
  }
}
