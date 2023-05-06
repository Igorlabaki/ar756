import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  return (
    <div className="leaflet-container w-[700px] overflow-x-hidden">
      <MapContainer
        center={[-23.581578, -46.566888]}
        zoom={16}
        className="h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
