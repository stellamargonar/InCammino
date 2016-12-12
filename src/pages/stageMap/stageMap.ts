import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({  
    templateUrl: 'stageMap.html',
})
export class stageMap {

  stage : {};

  constructor(public navParams: NavParams) {
    this.stage = navParams.data;
  }
}