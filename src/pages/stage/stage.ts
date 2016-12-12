import { Component , ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {stageDescription} from '../stageDescription/stageDescription';
//import {StageMap} from '../stageDescription/stageDescription';
import {stageHospitality} from '../stageHospitality/stageHospitality';
//import {StageJournal} from '../stageDescription/stageDescription'; 

@Component({
  selector: 'page-stage',
  templateUrl: 'stage.html'
})
export class Stage  {  
  stage : {};

  tabDescription;
  tabHospitality;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stage = navParams.get('stage');
    this.tabDescription = stageDescription;
    this.tabHospitality = stageHospitality;
  }
}
