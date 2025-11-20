import { useEffect, useState } from "react";

import DefaultPage from "./DashboardDefault";
import AzanPage from "../components/azan/AzanPage";
import IqomahPage from "../components/azan/IqomahPage";

import { usePrayerTimes } from "../utils/usePrayerTimes";
import { playBeepSound } from "../utils/sound";

export default function DashboardJam() {
  const {
    preAdzan,
    isAdzan,
    isIqomah,
    iqomahTimer,
  } = usePrayerTimes();

  const [pageMode, setPageMode] = useState<"default" | "azan" | "iqomah">("default");

  // 1 — PRE ADZAN (10 detik sebelum masuk waktu)
  useEffect(() => {
    if (preAdzan) {
      playBeepSound();
    }
  }, [preAdzan]);

  // 2 — MASUK WAKTU ADZAN
  useEffect(() => {
    if (isAdzan) {
      setPageMode("azan");
    }
  }, [isAdzan]);

  // 3 — MASUK IQOMAH
  useEffect(() => {
    if (isIqomah) {
      setPageMode("iqomah");
    }
  }, [isIqomah]);

  // 4 — KEMBALI KE DEFAULT SETELAH IQOMAH SELESAI
  useEffect(() => {
    if (!isIqomah && pageMode === "iqomah") {
      setPageMode("default");
    }
  }, [isIqomah]);

  return (
    <div className="w-full h-screen overflow-hidden relative">

      {/* DEFAULT */}
      {pageMode === "default" && <DefaultPage />}

      {/* AZAN */}
      {pageMode === "azan" && <AzanPage />}

      {/* IQOMAH */}
      {pageMode === "iqomah" && <IqomahPage counter={iqomahTimer} />}
    </div>
  );
}
