import { useEffect, useState } from "react";

export function useLaporanMode(pageMode: string) {
  const [laporanStartTime, setLaporanStartTime] = useState<number | null>(null);

  const startLaporanTimer = () => {
    setLaporanStartTime(Date.now());
  };

  // ===== 1 — Timer untuk masuk laporan setelah banner =====
  const shouldEnterLaporan =
    pageMode === "banner" &&
    laporanStartTime !== null &&
    (Date.now() - laporanStartTime) / 1000 >= 0; 

  useEffect(() => {
    if (pageMode === "laporan") {
      setLaporanStartTime(Date.now());
    }
  }, [pageMode]);  

  // ===== 2 — Laporan berjalan 1 menit (60 detik) =====
  const shouldExitLaporan =
    pageMode === "laporan" &&
    laporanStartTime !== null &&
    (Date.now() - laporanStartTime) / 1000 >= 60;

  return {
    startLaporanTimer,
    shouldEnterLaporan,
    shouldExitLaporan,
  };
}
