import { WidgetView } from './widget_view';
import { MAPBOX_ACCESS_TOKEN } from '../../constants/mapbox_const';

const MAP_INITIAL_POSITION = [43.3188648, -0.3203877];
const MAP_INITIAL_ZOOM = 1;
const MAP_WHEN_FIRST_FOUND_ZOOM = 15;

export class MapView extends WidgetView {

  constructor(options) {
    super(options);
    this.initMap();
    this.listenTo(this.model, 'change', this.updatePosition);
  }

  initMap() {
    L.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;
    this.map = L.mapbox.map(this.id, 'mapbox.streets')
                .setView(MAP_INITIAL_POSITION, MAP_INITIAL_ZOOM);
    L.control.scale().addTo(this.map);
  }

  updatePosition() {
    const latitude = this.model.attributes.value.latitude;
    const longitude = this.model.attributes.value.longitude;
    const latlng = L.latLng(latitude, longitude);
    if (this.gpsMarker === undefined) {
      this.gpsMarker = L.marker([latitude, longitude]);
      this.gpsMarker.addTo(this.map);
      this.map.setZoom(MAP_WHEN_FIRST_FOUND_ZOOM);
    }
    this.gpsMarker.setLatLng(latlng);
    this.gpsMarker.closePopup();
    this.gpsMarker.bindPopup(this.buildMarkerInfo(latitude, longitude));
    this.map.panTo(latlng);
  }

  buildMarkerInfo(latitude, longitude) {
    return `<strong>${this.device.getName()}</strong><br>located at [${latitude}; ${longitude}]`;
  }
}
