// src/services/realtimeData.js

export async function getRealtimeFeatures(zone) {
  return {
    crime_rate: zone.crimeRate ?? 0.5,
    traffic_density: zone.trafficRisk ?? 0.5,
    hospital_distance: zone.hospitalDistance ?? 2,
    time_of_day: new Date().getHours(),
    weather_risk: 0.3
  };
}
