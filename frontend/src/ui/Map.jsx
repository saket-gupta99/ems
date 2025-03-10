import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";

function Map({ children, lat, lng }) {
  return (
    <MapContainer
      center={!lat && !lng ? [19.054999, 72.8692035] : [lat, lng]}
      zoom={13}
      style={{ height: "100dvh", width: "100%" }}
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='© <a href="https://www.google.com/maps" target="_blank">Google Maps</a>'
      />
      {children}
    </MapContainer>
  );
}

export default Map;

// lyrs=m → Standard roadmap
// lyrs=s → Satellite
// lyrs=p → Terrain
// lyrs=h → Hybrid
