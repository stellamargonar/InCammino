import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'stageHospitality.html',
})
export class stageHospitality {
  static get parameters() {
    return [[NavController]];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}