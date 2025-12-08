import { useEffect, useState } from "react";
import { getClient } from "../../services/masterClient";

export default function HeaderMasjid() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getClient(token);

        setNama(data.name ?? "");
        setAlamat(data.location ?? "");
        setLogo(data.logo ?? null);
      } catch (err) {
        console.error("Gagal ambil data masjid:", err);
      }
    }

    loadData();

    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const logoUrl = logo
  ? `${import.meta.env.VITE_API_URL}/images/${logo}`
  : "/logo.png";

  return (
    <div className="flex gap-3 items-center">
      {/* Logo */}
      <img
        src={logoUrl}
        className="w-12 h-12 object-contain opacity-90"
        alt="Logo Masjid"
      />

      <div>
        <h1 className="text-xl font-bold text-black drop-shadow">
          {nama || "Nama Masjid"}
        </h1>
        <p className="text-sm text-black/80 leading-tight max-w-xs">
          {alamat || "Alamat Masjid"}
        </p>
      </div>
    </div>
  );
}
