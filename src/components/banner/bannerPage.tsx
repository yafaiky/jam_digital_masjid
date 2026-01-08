import { useEffect, useState } from "react";
import { getBanners } from "../../services/bannerClient";
import type { Banner } from "../../services/bannerClient";

export default function BannerPage({ index }: { index: number }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        console.error("Gagal load banner:", err);
      }
    };

    if (token) loadBanners();

    const interval = setInterval(loadBanners, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const current = banners[index];

  return (
    <div className="w-full h-full bg-black">
      {current?.url ? (
        <img
          src={current.url}
          className="w-full h-full object-cover"
          alt={`Banner ${index + 1}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/40">
          Tidak ada banner
        </div>
      )}
    </div>
  );
}
