import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import * as Omnivore  from 'leaflet-omnivore';
import * as L from 'leaflet';
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
    this.stagePosition = this.stage.position;
  }
  ionViewDidEnter() {
    this.loadMap();
  }
  loadMap() {
    this._map = L.map("map").setView(this.stagePosition.coordinates, this.stagePosition.zoom);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this._map);
    
    var gpxLayer = Omnivore.gpx('data/' + this.stagePosition.trackFile, null, null);
    var x = this;
    gpxLayer.on('ready', function() {
      this._map.fitBounds(gpxLayer.getBounds());
      x.buildElevationGraph(gpxLayer.toGeoJSON());
    });
    gpxLayer.addTo(this._map);
  }
  buildElevationGraph (layer) {
    var coordinates = layer.features[0].geometry.coordinates;
    var elevationData = [];
    var prevCoordinate = undefined;   
    for(var c in coordinates) {
      console.log(coordinates[c]);
      var distance = this._computeDistance(prevCoordinate, coordinates[c]);
      elevationData.push([distance, coordinates[c][2]]);
      prevCoordinate = coordinates[c];
    }  
    console.log(elevationData);
  }
  _computeDistance(cord1, cord2) {
    if (!cord1) return 0;
    var dLat = (cord1[0] - cord2[0]) * Math.PI / 180;
    var dLng = (cord1[1] - cord2[1]) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(cord1[0]) * Math.cos(cord2[0]); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = 6371 * c;
    return d;
  }


}