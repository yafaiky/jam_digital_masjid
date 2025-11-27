import { useEffect, useState } from "react";

import DefaultPage from "./DashboardDefault";
import AzanPage from "../components/azan/AzanPage";
import IqomahPage from "../components/azan/IqomahPage";
import BannerPage from "../components/banner/bannerPage";

import { usePrayerTimes } from "../utils/usePrayerTimes";
import { useBannerMode } from "../utils/useBannerMode";
import { playBeepSound } from "../utils/sound";

export default function DashboardJam() {
  const { preAdzan, isAdzan, isIqomah, iqomahTimer, nextPrayer } =
    usePrayerTimes();

  const [pageMode, setPageMode] = useState<
    "default" | "azan" | "iqomah" | "banner"
  >("default");

  const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null);

  // === Banner Hook ===
  const {
    bannerIndex,
    startDefaultTimer,
    shouldEnterBanner,
    shouldExitBanner,
  } = useBannerMode(pageMode);

  console.log(
  "PRE:", preAdzan,
  "| ADZAN:", isAdzan,
  "| IQOMAH:", isIqomah,
  "| TIMER:", iqomahTimer,
  "| NEXT:", nextPrayer,
  "| MODE:", pageMode,
  "| BANNER INDEX:", bannerIndex,
);

  // PRE ADZAN
  useEffect(() => {
    if (preAdzan && nextPrayer && nextPrayer !== lastPlayedPrayer) {
      playBeepSound();
      setLastPlayedPrayer(nextPrayer);
    }
  }, [preAdzan, nextPrayer, lastPlayedPrayer]);

  // MASUK ADZAN
  useEffect(() => {
    if (isAdzan) setPageMode("azan");
  }, [isAdzan]);

  // MASUK IQOMAH
  useEffect(() => {
    if (isIqomah) setPageMode("iqomah");
  }, [isIqomah]);

  // SELESAI IQOMAH -> default + mulai timer banner
  useEffect(() => {
    if (!isIqomah && pageMode === "iqomah") {
      setPageMode("default");
      startDefaultTimer();
    }
  }, [isIqomah, pageMode]);

  // DEFAULT -> masuk banner setelah 5 menit
  useEffect(() => {
    if (shouldEnterBanner) setPageMode("banner");
  }, [shouldEnterBanner]);

  // BANNER -> kembali default setelah 2.5 menit
  useEffect(() => {
    if (shouldExitBanner && pageMode === "banner") {
      setPageMode("default");
      startDefaultTimer();
    }
  }, [shouldExitBanner, pageMode]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {pageMode === "default" && <DefaultPage />}
      {pageMode === "azan" && <AzanPage />}
      {pageMode === "iqomah" && <IqomahPage counter={iqomahTimer} />}
      {pageMode === "banner" && <BannerPage index={bannerIndex} />}
    </div>
  );
}
