import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  imports: [],
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.css',
})
export class LeafletMap implements OnInit, AfterViewInit {
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([23.7771, 90.3994]),
    L.marker([24, 90]),
    L.marker([23, 91]),
  ]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
    for (let marker of this.markers) {
      marker.addTo(this.map);
      marker.bindPopup("Hello!")
    }
    L.polyline([[23.7771, 90.3994], [24, 90], [23, 91]]).addTo(this.map)
  }


  centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map into the boundary
    this.map.fitBounds(bounds);
  }
}
