// src/hooks/usePrayerTimes.ts
import { useEffect, useState } from "react";

export function usePrayerTimes() {
  const prayerTimes = [
    { name: "Imsak", time: "04:02" },
    { name: "Shubuh", time: "05:25" },
    { name: "Dzuhur", time: "11:38" },
    { name: "Ashar", time: "15:01" },
    { name: "Maghrib", time: "17:51" },
    { name: "Isya", time: "19:05" },
  ];

  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    function updateTimes() {
      const now = new Date();

      const toDate = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
      };

      // --- Tentukan current & next prayer ---
      let curr = null;
      let next = null;

      for (let i = 0; i < prayerTimes.length; i++) {
        const start = toDate(prayerTimes[i].time);
        const end = prayerTimes[i + 1] ? toDate(prayerTimes[i + 1].time) : null;

        if (now >= start && (!end || now < end)) {
          curr = prayerTimes[i];
          next = prayerTimes[i + 1] || prayerTimes[0]; // reset ke Imsak
          break;
        }
      }

      setCurrentPrayer(curr?.name || null);
      setNextPrayer(next?.name || null);

      // --- Hitung countdown ---
      const target = toDate(next!.time);
      let diff = target.getTime() - now.getTime();
      if (diff < 0) diff += 24 * 60 * 60 * 1000;

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      setCountdown(`${h}:${m}:${s}`);
    }

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return { prayerTimes, currentPrayer, nextPrayer, countdown };
}
