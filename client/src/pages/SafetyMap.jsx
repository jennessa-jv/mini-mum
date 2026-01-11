import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import useRiskStream from "../hooks/useRiskStream";
import "leaflet/dist/leaflet.css";

export default function SafetyMap() {
  const zones = useRiskStream() || [];

  const getColor = (risk) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "orange";
    return "green";
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {zones.map((z) => (
          <CircleMarker
            key={z.id || z._id}
            center={[z.coordinates.lat, z.coordinates.lng]}
            radius={12}
            pathOptions={{ color: getColor(z.riskLevel) }}
          >
            <Popup>
              <strong>{z.name}</strong>
              <br />

              🧮 Crime Score:{" "}
              {typeof z.crimeScore === "number"
                ? z.crimeScore.toFixed(2)
                : typeof z.crime_score === "number"
                ? z.crime_score.toFixed(2)
                : "N/A"}
              <br />

              ⚠️ Risk: {z.riskLevel ?? "Unknown"}
              <br />

              📊 Confidence:{" "}
              {typeof z.confidence === "number"
                ? `${Math.round(z.confidence * 100)}%`
                : "N/A"}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
