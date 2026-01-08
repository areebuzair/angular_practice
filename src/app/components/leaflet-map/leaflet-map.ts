import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { points } from './heatpoints';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.css',
})
export class LeafletMap implements AfterViewInit {
  private map!: L.Map;
  private heatLayer!: L.HeatLayer;
  heatDrawingEnabled = false;

  private readonly markerCoords: L.LatLngExpression[] = [
    [23.7771, 90.3994],
    [23.72, 90.39],
    [23.73, 90.38],
  ];

  private markerGroup = L.layerGroup();

  private readonly markers: L.Marker[] = this.markerCoords.map(
    coords => L.marker(coords)
  );

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
    this.addPolyline();
    this.initHeatLayer();
    this.initRightClickMarker();
    this.centerMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [23.75, 90.39],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.markerGroup.addTo(this.map);
  }

  private addMarkers(): void {
    for (const marker of this.markers) {
      marker
        .addTo(this.markerGroup)
        .bindPopup(`Hello from ${marker.getLatLng()}`);
    }
  }

  private initRightClickMarker(): void {
    this.map.on('contextmenu', (e: L.LeafletMouseEvent) => {
      const marker = L.marker(e.latlng, {
        draggable: false,
      });

      marker
        .addTo(this.markerGroup)
        .bindPopup(
          `Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`
        );
    });
  }


  private addPolyline(): void {
    L.polyline(this.markerCoords, {
      color: 'blue',
      weight: 3,
    }).addTo(this.map);
  }

  private initHeatLayer(): void {
    this.heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(this.map);

    let drawingEnabled = true;

    this.map.on('movestart', () => {
      drawingEnabled = false;
    });

    this.map.on('moveend', () => {
      drawingEnabled = true;
    });

    this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
      if (drawingEnabled && this.heatDrawingEnabled) {
        this.heatLayer.addLatLng(e.latlng);
      }
    });
  }

  centerMap(): void {
    const bounds = L.latLngBounds(
      this.markers.map(marker => marker.getLatLng())
    );

    this.map.fitBounds(bounds, {
      padding: [20, 20],
    });
  }

  toggleHeatDrawing(): void {
    this.heatDrawingEnabled = !this.heatDrawingEnabled;
  }

  clearHeat(): void {
    if (confirm("Remove all heat points?")) {
      this.heatLayer.setLatLngs([]);
    }
  }

  clearMarkers(): void {
    if (confirm("Remove all markers?")) {
      this.markerGroup.clearLayers();
    }
  }


}
