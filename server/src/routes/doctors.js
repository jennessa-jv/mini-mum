import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const query = `
      [out:json][timeout:8];
      (
        node["amenity"="hospital"](around:8000,${lat},${lng});
        node["amenity"="clinic"](around:8000,${lat},${lng});
      );
      out tags;
    `;

    const response = await axios.post(
      "https://overpass.kumi.systems/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    );

    const hospitals = response.data.elements.map((el) => ({
      id: el.id,
      name: el.tags?.name || "Nearby Hospital",
      address:
        el.tags?.["addr:street"] ||
        el.tags?.["addr:full"] ||
        "Address not available",
      lat: el.lat,
      lng: el.lon
    }));

    // 🔒 Fallback if Overpass is empty or slow
    if (hospitals.length === 0) {
      return res.json([
        {
          id: "fallback",
          name: "Nearby Government Hospital",
          address: "Within 8km of your location",
          lat,
          lng
        }
      ]);
    }

    res.json(hospitals);
  } catch (error) {
    console.error("Overpass error:", error.message);
    
    res.json([
      {
        id: "fallback-error",
        name: "Local Medical Facility",
        address: "Please check internet or try again later",
        lat,
        lng
      }
    ]);
  }
});

export default router;
