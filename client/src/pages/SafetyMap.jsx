import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import useRiskStream from "../hooks/useRiskStream";
import "leaflet/dist/leaflet.css";

export default function SafetyMap() {
  const zones = useRiskStream();

  const getColor = (risk) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "orange";
    return "green";
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "fixed",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "8px 16px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
          fontSize: "14px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "18px"
        }}
      >
        <b>Risk Levels</b>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 12,
              background: "red",
              borderRadius: "50%"
            }}
          />
          High
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 12,
              background: "orange",
              borderRadius: "50%"
            }}
          />
          Medium
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 12,
              background: "green",
              borderRadius: "50%"
            }}
          />
          Low
        </div>
      </div>

      <MapContainer center={[20.59, 78.96]} zoom={5} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {zones.map((z) => (
          <CircleMarker
            key={z.id}
            center={[z.coordinates.lat, z.coordinates.lng]}
            radius={12}
            pathOptions={{ color: getColor(z.riskLevel) }}
          >
            <Popup>
              <b>{z.name}</b><br />
              Crime Score: {z.crimeScore.toFixed(3)}<br />
              Risk: {z.riskLevel}<br />
              Confidence: {Math.round(z.confidence * 100)}%
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
