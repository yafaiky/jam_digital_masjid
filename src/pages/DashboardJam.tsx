import { useEffect, useState } from "react";

import DefaultPage from "./DashboardDefault";
import AzanPage from "../components/azan/AzanPage";
import IqomahPage from "../components/azan/IqomahPage";

import { usePrayerTimes } from "../utils/usePrayerTimes";
import { playBeepSound } from "../utils/sound";

export default function DashboardJam() {
  const { preAdzan, isAdzan, isIqomah, iqomahTimer, nextPrayer } =
    usePrayerTimes();

  const [pageMode, setPageMode] = useState<"default" | "azan" | "iqomah">(
    "default"
  );

  const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null);

  // ⬇️ TARUH LOG INI DI SINI
  useEffect(() => {
    console.log("STATE:", { preAdzan, isAdzan, isIqomah, iqomahTimer });
  }, [preAdzan, isAdzan, isIqomah, iqomahTimer]);

  // 1 — PRE ADZAN
  useEffect(() => {
    if (preAdzan && nextPrayer && nextPrayer !== lastPlayedPrayer) {
      playBeepSound();
      setLastPlayedPrayer(nextPrayer);
    }
  }, [preAdzan, nextPrayer, lastPlayedPrayer]);

  // 2 — MASUK ADZAN
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

  // 4 — KEMBALI KE DEFAULT SETELAH IQOMAH
  useEffect(() => {
    if (!isIqomah && pageMode === "iqomah") {
      setPageMode("default");
    }
  }, [isIqomah, pageMode]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {pageMode === "default" && <DefaultPage />}
      {pageMode === "azan" && <AzanPage />}
      {pageMode === "iqomah" && <IqomahPage counter={iqomahTimer} />}
    </div>
  );
}
