import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function useRiskStream() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    socket.on("risk-update", setZones);
    return () => socket.off("risk-update");
  }, []);

  return zones;
}
