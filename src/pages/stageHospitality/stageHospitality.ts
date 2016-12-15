import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';

import {NavController, NavParams} from 'ionic-angular';
import * as Omnivore  from 'leaflet-omnivore';
import * as L from 'leaflet';

@Component({
  templateUrl: 'stageHospitality.html',
})
export class stageHospitality {
  private stage : any;
  private _map : any;

  hospitalities : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.stage = navParams.data;
  }
  ionViewDidEnter() {
    this.loadMap();
    this.loadHospitality();
  }
  loadMap() {
    this._map = L.map("map").setView([0,0] ,13);
    var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    OpenStreetMap_Mapnik.addTo(this._map);
    
    var gpxLayer = Omnivore.gpx('data/' + this.stage.trackFile, null, null);
    var x = this;
    gpxLayer.on('ready', function() {
      this._map.fitBounds(gpxLayer.getBounds());
    });
    gpxLayer.addTo(this._map);
  }

  loadHospitality() {
    this._loadHospitalityData().then(() => {
      // create layer
      var hospLayerData = [];

      this.hospitalities.forEach((hospitality) => {
        // add point to layer
        // TODO add style to marker
        hospLayerData.push(L.marker(hospitality.coordinates).bindPopup(hospitality.name));
      });

      // add layer to map
      L.layerGroup(hospLayerData).addTo(this._map);
    });

  }

  _loadHospitalityData() {
    // read data from file 
    if (this.hospitalities) {
      // already loaded data
      return Promise.resolve(this.hospitalities);
    }
    // don't have the data yet
    return new Promise(resolve => {
        this.http.get('data/accoglienza.json').subscribe(res => {
            console.log('[DEBUG] loading data');
            console.log(res.json());
            this.hospitalities = res.json();
            resolve(this.hospitalities);
        });
    })
  }

  hospitalitySelected($event, hospitality) {
    // TODO
    // move map focus on the hospitality cooridates
    this._map.setView(hospitality.coordinates);
  }
}