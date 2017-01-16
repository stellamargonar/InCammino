import { Component } from '@angular/core';
import { NavParams, ActionSheetController } from 'ionic-angular';
import { Database } from '../../providers/database';


@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class Journal {
  private posts: Array<any> = [{}];


  constructor(public navParams: NavParams, private database: Database, private actionSheetCtrl: ActionSheetController) {
    this.loadJournal();
  }
  
  loadJournal () {
    this.database.getAll().then( 
      docs => {this.posts = docs;} , 
      error => {}
    );
  }
}
