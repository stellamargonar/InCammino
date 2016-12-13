import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import * as Leaflet from 'leaflet';
import * as Omnivore from 'leaflet-omnivore';
import { Geolocation } from 'ionic-native';


@Component({  
    templateUrl: 'stageMap.html',
})
export class stageMap {

  stage : any;
  stagePosition : any;
  private _map: any;
  private _currentLatLng: any;
  

  constructor(public navParams: NavParams) {
    // stage must have a map property containing:
    // - name/url of the gpx file
    // - coordinates for centering the map  : [latitude, longitude]
    // - zoom level : 13
    this.stage = navParams.data;
    console.log(this.stage);
    this.stagePosition = this.stage.position;
  }
  ionViewDidEnter() {
    this.loadMap();
  }
  loadMap() {
    this._map = Leaflet.map("map").setView(this.stagePosition.coordinates, this.stagePosition.zoom);
    Leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this._map);
    Omnivore.gpx('data/' + this.stagePosition.trackFile).addTo(this._map);
  }
}