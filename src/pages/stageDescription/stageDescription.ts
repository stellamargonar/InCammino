import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({  
    selector: 'page-stage-description',
    templateUrl: 'stageDescription.html',
})
export class stageDescription {

  stage : {};

  constructor(public navParams: NavParams) {
    this.stage = navParams.data;
  }
}