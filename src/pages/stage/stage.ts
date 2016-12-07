import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-stage',
  templateUrl: 'stage.html'
})
export class Stage {
  stage : {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stage = navParams.get('stage');
  }
}
