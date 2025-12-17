import { useEffect, useState } from "react";

export function useBannerMode(pageMode: string) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [defaultStartTime, setDefaultStartTime] = useState<number | null>(null);
  const [bannerStartTime, setBannerStartTime] = useState<number | null>(null);

  const startDefaultTimer = () => {
    setDefaultStartTime(Date.now());
    setBannerIndex(0);
  };

  // ===== 1 — Timer 5 menit untuk masuk banner =====
  const shouldEnterBanner =
    pageMode === "default" &&
    defaultStartTime !== null &&
    (Date.now() - defaultStartTime) / 1000 >= 100;

  useEffect(() => {
    if (pageMode === "banner") {
      setBannerStartTime(Date.now());
    }
  }, [pageMode]);

  // ===== 2 — Ganti banner tiap 30 detik (LOOP) =====
  useEffect(() => {
    if (pageMode !== "banner") return;

    const interval = setInterval(() => {
      setBannerIndex((i) => (i + 1) % 5); // loop 0 → 1 → 2 → 3 → 4 → 0
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
