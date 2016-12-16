import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database } from '../../providers/database'

@Component({
  selector: 'page-stage-journal',
  templateUrl: 'stage-journal.html'
})
export class StageJournal {
  private journal: any = {};
  private stage : any;
  private edit : boolean = true;

  constructor(public navParams: NavParams, private database: Database) {
    this.stage = navParams.data;
    this.loadJournal();
  }

  ionViewDidLoad() {
  }

  loadJournal () {
    this.database.getJournal(this.stage.code).then( 
      doc => {this.journal = doc; this.edit = false } , 
      error => {}
    );
  }

  toggleEdit () {
    this.edit = !this.edit;
  }

  saveJournal(){
    var promise;
    this.journal._id = this.stage.code;
    this.database.updateJournal(this.journal).then( () => this.loadJournal() )    
  }
}
