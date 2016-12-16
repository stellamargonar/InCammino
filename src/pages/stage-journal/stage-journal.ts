import { Component } from '@angular/core';
import { NavParams, ActionSheetController } from 'ionic-angular';
import { Database } from '../../providers/database';


@Component({
  selector: 'page-stage-journal',
  templateUrl: 'stage-journal.html'
})
export class StageJournal {
  private journal: any = {};
  private stage : any;
  private edit : boolean = false;
  private tmpText: string = '';

  constructor(public navParams: NavParams, private database: Database, private actionSheetCtrl: ActionSheetController) {
    this.stage = navParams.data;
    this.loadJournal();
  }
  
  loadJournal () {
    this.database.getJournal(this.stage.code).then( 
      doc => {this.journal = doc; this.edit = false ; console.log(this.journal);} , 
      error => {}
    );
  }
  
  toggleEdit () {
    this.edit = !this.edit;
  }

  addText () {
    this.journal.text = this.journal.text || [];
    this.journal.text.push({text: this.tmpText, date: new Date()});
    this.tmpText = '';
    this.saveJournal();
  }

  onCardPressed(index) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.journal.text.splice(index, 1);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }]
    });
    actionSheet.present();
  }

  saveJournal(){
    var promise;
    this.journal._id = this.stage.code;
    this.journal.date = new Date();
    this.edit = false;
    this.database.updateJournal(this.journal).then( () => this.loadJournal() )    
  }
}
