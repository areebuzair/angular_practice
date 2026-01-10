declare namespace L {
  type HeatPoint = [number, number, number];

  interface HeatLayer extends Layer {
    addLatLng(latlng: LatLngExpression | HeatPoint): this;
    setLatLngs(latlngs: (LatLngExpression | HeatPoint)[]): this;
  }

  function heatLayer(
    latlngs: (LatLngExpression | HeatPoint)[],
    options?: {
      radius?: number;
      blur?: number;
      maxZoom?: number;
      minOpacity?: number;
      gradient?: Record<number, string>;
    }
  ): HeatLayer;
}
