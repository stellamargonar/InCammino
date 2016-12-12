import { Component, ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

import { Stage } from '../../pages/stage/stage'

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
export class Journey {
  stages: Array<{}> ;

  constructor(public navCtrl: NavController, public http: Http) {
    this.load()  
  }

  stageSelected(event, stage) {
    // move to stage page
    this.navCtrl.setRoot(Stage, {stage: stage});
    //this.navCtrl.push(Stage, { stage: stage });
  }

  load() {
      if (this.stages) {
          // already loaded data
          return Promise.resolve(this.stages);
      }

      // don't have the data yet
      return new Promise(resolve => {
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get('data/stages.json').subscribe(res => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.stages = res.json();
              resolve(this.stages);
          });
      });
  }
}
