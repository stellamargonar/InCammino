import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import * as Omnivore  from 'leaflet-omnivore';
import * as L from 'leaflet';

@Component({  
    templateUrl: 'stageMap.html',
})
export class stageMap {

  stage : any;
  stagePosition : any;
  private _map: any;
  private _currentLatLng: any;
  public lineChartData:Array<any> = undefined;
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    legend: false,
    fullWidth: false,
    scales: { 
      xAxes: [{ type: 'linear', display: true , position: 'bottom'}] , 
      yAxes: [{type: 'linear', min: 0}]}
  };


  constructor(public navParams: NavParams) {
    // stage must have a map property containing:
    this.stage = navParams.data;
  }
  ionViewDidEnter() {
    this.loadMap();
  }
  loadMap() {
    this._map = L.map("map").setView([0,0] ,13);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this._map);
    
    var gpxLayer = Omnivore.gpx('data/' + this.stage.trackFile, null, null);
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
    var previous = {
      coordinates : undefined,
      distance: 0,
      elevation: 0
    };

    var maxElevation = 0;
    var dislivello = 0;

    for(var c in coordinates) {
      var distance = previous.distance + this._computeDistance(previous.coordinates, coordinates[c]);
      
      var currentElevation = coordinates[c][2];
      maxElevation = Math.max(maxElevation, currentElevation);
      if (currentElevation > (previous.elevation + 10)) {
        dislivello += (currentElevation - previous.elevation);
      }
      elevationData.push({x: distance, y: currentElevation});
      
      previous = {
        coordinates : coordinates[c],
        distance : distance,
        elevation: currentElevation
      };
    }
    this.lineChartData = [{data: elevationData, pointRadius	: 0}];

    this.stage.technicalData = {
      totalLength : previous.distance,
      maxElevation: maxElevation,
      dislivello : dislivello
    };
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