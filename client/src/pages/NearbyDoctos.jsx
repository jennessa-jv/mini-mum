import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
export default function NearbyDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchDoctors(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  const fetchDoctors = async (lat, lng) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/doctors/nearby?lat=${lat}&lng=${lng}`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        setDoctors([]);
      }
    } catch {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Link to="/dashboard" className="text-sm text-pink-600 hover:underline">
        ← Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-pink-700 mb-4">
         Nearby Hospitals
      </h1>

      {loading && <p>Loading nearby hospitals...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && doctors.length === 0 && (
        <p className="text-gray-500">No nearby hospitals found.</p>
      )}

      {doctors.map((doc) => (
        <div
          key={doc.id}
          className="bg-white border rounded-xl p-4 mb-3 shadow-sm"
        >
          <h2 className="font-semibold">{doc.name}</h2>
          <p className="text-sm text-gray-600">{doc.address}</p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${doc.lat},${doc.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-pink-600 underline text-sm"
          >
            View on Map
          </a>
        </div>
      ))}
    </div>
  );
}
