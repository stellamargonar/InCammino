import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

@Component({  
    selector: 'page-stage-description',
    templateUrl: 'stageDescription.html',
})
export class stageDescription {
  static get parameters() {
    return [[NavController]];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}