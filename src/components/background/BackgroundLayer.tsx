import { useEffect, useState } from "react";
import { getClient } from "../../services/masterClient";

export default function BackgroundLayer() {
  const [background, setBackground] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    async function loadBackground() {
      try {
        const data = await getClient(token);
        setBackground(data.config_background ?? null);
      } catch (err) {
        console.error("Gagal ambil background:", err);
      }
    }

    loadBackground(); 

    // Optional: refresh tiap 5 detik supaya live update
    const interval = setInterval(loadBackground, 5000);
    return () => clearInterval(interval);
  }, []);

  const backgroundUrl = background
  ? `${import.meta.env.VITE_API_URL}/storage/${background}`
  : "background.jpg";


  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={backgroundUrl}
        className="w-full h-full object-cover brightness-75"
        alt="background"
      />

      {/* overlay gelap */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
