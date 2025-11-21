import { useEffect, useState } from "react";

export function usePrayerTimes() {
  const prayerTimes = [
    { name: "Imsak", time: "04:02" },
    { name: "Shubuh", time: "05:25" },
    { name: "Dzuhur", time: "11:41" },
    { name: "Ashar", time: "15:44" },
    { name: "Maghrib", time: "17:51" },
    { name: "Isya", time: "19:05" },
  ];

  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [countdown, setCountdown] = useState("00:00:00");

  // --- State tambahan untuk notifikasi ---
  const [preAdzan, setPreAdzan] = useState(false); // 10 detik sebelum adzan
  const [isAdzan, setIsAdzan] = useState(false);   // Saat adzan
  const [isIqomah, setIsIqomah] = useState(false); // Saat iqomah

  const [iqomahTimer, setIqomahTimer] = useState(0); // detik

  useEffect(() => {
    const toDate = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d;
    };

    function updateTimes() {
      const now = new Date();

      let curr = null;
      let next = null;

      // --- Tentukan current & next prayer ---
      for (let i = 0; i < prayerTimes.length; i++) {
        const start = toDate(prayerTimes[i].time);
        const end = prayerTimes[i + 1] ? toDate(prayerTimes[i + 1].time) : null;

        if (now >= start && (!end || now < end)) {
          curr = prayerTimes[i];
          next = prayerTimes[i + 1] || prayerTimes[0];
          break;
        }
      }

      setCurrentPrayer(curr?.name || null);
      setNextPrayer(next?.name || null);

      if (!next) return;

      const target = toDate(next.time);
      let diff = target.getTime() - now.getTime();
      if (diff < 0) diff += 86400000;

      // === HITUNG COUNTDOWN ===
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
          s
        ).padStart(2, "0")}`
      );
     
      // --- PRE ADZAN 10 DETIK ---
      setPreAdzan(diff <= 10000 && diff > 0);

      // --- LOGIKA ADZAN DAN IQOMAH ---
      if (diff <= 0 && diff > -10000) {
        // Adzan
        setIsAdzan(true);
        setIsIqomah(false);
      } else if (diff <= -10000) {
        // Iqomah
        setIsAdzan(false);
        if (!isIqomah) {
          setIsIqomah(true);
          setIqomahTimer(600); // 10 menit
        }
      }

      // Hitung mundur iqomah
      if (isIqomah && iqomahTimer > 0) {
        setIqomahTimer((t) => t - 1);
      } else if (isIqomah && iqomahTimer === 0) {
        setIsIqomah(false);
      }
    }

    // Jalankan langsung + setInterval
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []); 


  return {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    countdown,

    // Untuk UI Dashboard
    preAdzan,
    isAdzan,
    isIqomah,
    iqomahTimer,
  };
}
