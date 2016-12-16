import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database } from '../../providers/database'

@Component({  
    templateUrl: 'stageDescription.html',
})
export class stageDescription {

  stage : any;
  journal : any;

  constructor(public navParams: NavParams, private database: Database) {
    this.stage = navParams.data;
    this.loadJournal();
  }
  loadJournal () {
    this.database.getAll().then( (data) => {
       this.journal = data ; console.log('JOURNAL', this.journal);
    });
  }
}