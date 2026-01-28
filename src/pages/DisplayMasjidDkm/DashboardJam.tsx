import { useEffect, useState } from "react";

import DefaultPage from "./DashboardDefault";
import AzanPage from "../../components/azan/AzanPage";
import IqomahPage from "../../components/azan/IqomahPage";
import KomatPage from "../../components/azan/KomatPage";
import BlankPage from "../../components/azan/BlankPage";
import BannerPage from "../../components/banner/bannerPage";
import LaporanDisplay from "../../components/LaporanDisplay/Display";

import { usePrayerTimes } from "../../utils/usePrayerTimes";
import { useBannerMode } from "../../utils/useBannerMode";
import { useLaporanMode } from "../../utils/useLaporanMode";
import { getClient } from "../../services/masterClient";

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardJam() {
  const [soundUrl, setSoundUrl] = useState<string>("");

  // Load sound config from server
  useEffect(() => {
    const loadSoundConfig = async () => {
      try {
        const client = await getClient();
        if (client.sound_url) {
          setSoundUrl(client.sound_url);
        } else if (client.config_sound_alert) {
          setSoundUrl(`${API_URL}/storage/${client.config_sound_alert}`);
        }
      } catch (err) {
        console.error("Failed to load sound config:", err);
      }
    };

    loadSoundConfig();
  }, []);

  // Prayer Times Hook
  const {
    preAdzan,
    isAdzan,
    isIqomah,
    iqomahTimer,
    isKomat,
    blankPage,
    nextPrayer,
  } = usePrayerTimes({ soundUrl });

  const [pageMode, setPageMode] = useState<
    "default" | "azan" | "iqomah" | "komat" | "blank" | "banner" | "laporan"
  >("default");

  const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null);

  // Banner Hook
  const {
    bannerIndex,
    startDefaultTimer,
    shouldEnterBanner,
    shouldExitBanner,
  } = useBannerMode(pageMode);

  // Laporan Hook
  const {
    startLaporanTimer,
    shouldEnterLaporan,
    shouldExitLaporan,
  } = useLaporanMode(pageMode);


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
    bannerIndex,
    "| SOUND URL:",
    soundUrl,
  );

  // pengaturan saat mau masuk waktu solat
  // PRE ADZAN - sound diputar dari usePrayerTimesWithSound
  useEffect(() => {
    if (preAdzan && nextPrayer && nextPrayer !== lastPlayedPrayer) {
      setLastPlayedPrayer(nextPrayer);
    }
  }, [preAdzan, nextPrayer, lastPlayedPrayer]);

  useEffect(() => {
    // PRIORITY ORDER (TOP → DOWN)

    if (isAdzan) {
      setPageMode("azan");
      return;
    }

    if (isIqomah) {
      setPageMode("iqomah");
      return;
    }

    if (isKomat) {
      setPageMode("komat");
      return;
    }

    if (blankPage) {
      setPageMode("blank");
      return;
    }

    // Banner hanya boleh muncul di DEFAULT
    if (pageMode === "default" && shouldEnterBanner) {
      setPageMode("banner");
      return;
    }

    if (pageMode === "banner" && shouldExitBanner) {
      setPageMode("laporan");
      return;
    }

    if (pageMode === "default" && shouldEnterLaporan) {
      setPageMode("laporan");
      return;
    }

    // Laporan setelah banners
    if (pageMode === "laporan" && shouldExitLaporan) {
      setPageMode("default");
      return;
    }

    // Blank selesai → kembali default
    if (!blankPage && pageMode === "blank") {
      setPageMode("default");
      return;
    }
  }, [
    isAdzan,
    isIqomah,
    isKomat,
    blankPage,
    shouldEnterBanner,
    shouldExitBanner,
    shouldEnterLaporan,
    shouldExitLaporan,
    pageMode,
  ]);

  // RESET timer banner SETIAP masuk DEFAULT
  useEffect(() => {
    if (pageMode === "default") {
      startDefaultTimer();
    }
  }, [pageMode]);

  // START laporan timer SETIAP masuk LAPORAN
  useEffect(() => {
    if (pageMode === "laporan") {
      startLaporanTimer();
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
      {pageMode === "laporan" && <LaporanDisplay />}
    </div>
  );
}
