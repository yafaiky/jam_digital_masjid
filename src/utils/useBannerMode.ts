import { useEffect, useState } from "react";

export function useBannerMode(pageMode: string) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [defaultStartTime, setDefaultStartTime] = useState<number | null>(null);

  const [bannerStartTime, setBannerStartTime] = useState<number | null>(null);

  // Dipanggil dari DashboardJam ketika masuk default
  const startDefaultTimer = () => {
    setDefaultStartTime(Date.now());
    setBannerIndex(0);
  };

  // ===== 1 — Timer 5 menit untuk masuk banner =====
  const shouldEnterBanner =
    pageMode === "default" &&
    defaultStartTime !== null &&
    (Date.now() - defaultStartTime) / 1000 >= 120;

  useEffect(() => {
    if (pageMode === "banner") {
      setBannerStartTime(Date.now()); // catat kapan banner mulai
    }
  }, [pageMode]);

  // ===== 2 — Pindah banner setiap 30 detik =====
  useEffect(() => {
    if (pageMode !== "banner") return;

    const interval = setInterval(() => {
      setBannerIndex((i) => Math.min(i + 1, 4));
    }, 30000);

    return () => clearInterval(interval);
  }, [pageMode]);

  // ===== 3 — Banner berjalan 2.5 menit (150 detik) =====
  const shouldExitBanner =
    pageMode === "banner" &&
    bannerStartTime !== null &&
    (Date.now() - bannerStartTime) / 1000 >= 150;

  return {
    bannerIndex,
    startDefaultTimer,
    shouldEnterBanner,
    shouldExitBanner,
  };
}
