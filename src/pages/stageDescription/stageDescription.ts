import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { Database } from '../../providers/database/database';

@Component({  
    selector: 'page-stage-description',
    templateUrl: 'stageDescription.html',
})
export class stageDescription {

  stage : any;
  journal : any;

  constructor(public navParams: NavParams, private database: Database) {
    this.stage = navParams.data;
  }
  loadJournal () {
    this.database.getJournal(this.stage['id']).then( (data) => {
       this.journal = data ; console.log('JOURNAL', this.journal);
    });
  }
}