import { useEffect, useState } from "react";
import { getClient } from "../../services/masterClient";
import type { Client } from "../../services/masterClient";

export default function BackgroundLayer() {
  const [client, setClient] = useState<Client | null>(null);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    async function loadClient() {
      try {
        const data = await getClient();
        setClient(data);
      } catch (err) {
        console.error("Gagal ambil background:", err);
      }
    }

    if (token) loadClient();

    const interval = setInterval(loadClient, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const backgroundUrl = client?.background_url ?? "/background.jpg";

  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={backgroundUrl}
        className="w-full h-full object-cover brightness-75"
        alt="background"
      />

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
