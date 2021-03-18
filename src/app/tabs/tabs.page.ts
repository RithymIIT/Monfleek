import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentTab:any = 'tab1';
  constructor(private menu: MenuController) {}

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  

}