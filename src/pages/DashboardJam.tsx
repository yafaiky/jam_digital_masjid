import { useEffect, useState } from "react";

import DefaultPage from "./DashboardDefault";
import AzanPage from "../components/azan/AzanPage";
import IqomahPage from "../components/azan/IqomahPage";
import KomatPage from "../components/azan/KomatPage";
import BlankPage from "../components/azan/BlankPage";
import BannerPage from "../components/banner/bannerPage";

import { usePrayerTimes } from "../utils/usePrayerTimes";
import { useBannerMode } from "../utils/useBannerMode";
import { playBeepSound } from "../utils/sound";

export default function DashboardJam() {
  const {
    preAdzan,
    isAdzan,
    isIqomah,
    iqomahTimer,
    isKomat,
    blankPage,
    nextPrayer,
  } = usePrayerTimes();

  const [pageMode, setPageMode] = useState<
    "default" | "azan" | "iqomah" | "komat" | "blank" | "banner"
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
    "PRE:",
    preAdzan,
    "| ADZAN:",
    isAdzan,
    "| IQOMAH:",
    isIqomah,
    "| KOMAT:",
    isKomat,
    "| IQOMAH TIMER:",
    iqomahTimer,
    "| NEXT:",
    nextPrayer,
    "| MODE:",
    pageMode,
    "| BANNER INDEX:",
    bannerIndex
  );

  // PRE ADZAN - bunyikan beep 1x
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

  // MASUK KOMAT
  useEffect(() => {
    if (isKomat) setPageMode("komat");
  }, [isKomat]);

  // MASUK BLANK PAGE
  useEffect(() => {
    if (blankPage) setPageMode("blank");
  }, [blankPage]);

  // IQOMAH selesai → biarkan usePrayerTimes mengatur lanjutannya
  useEffect(() => {
    if (!isIqomah && pageMode === "iqomah") {
      /* no-op */
    }
  }, [isIqomah, pageMode]);

  // KOMAT selesai → biarkan lanjut ke blank page
  useEffect(() => {
    if (!isKomat && pageMode === "komat") {
      /* no-op */
    }
  }, [isKomat, pageMode]);

  // BLANK → selesai → kembali DEFAULT (TANPA startDefaultTimer)
  useEffect(() => {
    if (!blankPage && pageMode === "blank") {
      setPageMode("default");
    }
  }, [blankPage, pageMode]);

  // DEFAULT → masuk Banner
  useEffect(() => {
    if (shouldEnterBanner) setPageMode("banner");
  }, [shouldEnterBanner]);

  // BANNER selesai → kembali DEFAULT (TANPA startDefaultTimer)
  useEffect(() => {
    if (shouldExitBanner && pageMode === "banner") {
      setPageMode("default");
    }
  }, [shouldExitBanner, pageMode]);

  // RESET timer banner SETIAP masuk DEFAULT
  useEffect(() => {
    if (pageMode === "default") {
      startDefaultTimer();
    }
  }, [pageMode]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {pageMode === "default" && <DefaultPage />}
      {pageMode === "azan" && <AzanPage />}
      {pageMode === "iqomah" && <IqomahPage counter={iqomahTimer} />}
      {pageMode === "komat" && <KomatPage />}
      {pageMode === "blank" && <BlankPage />}
      {pageMode === "banner" && <BannerPage index={bannerIndex} />}
    </div>
  );
}
