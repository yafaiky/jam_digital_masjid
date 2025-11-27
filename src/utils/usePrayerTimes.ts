import { useEffect, useState, useRef } from "react";
import { playBeepSound } from "./sound";

export function usePrayerTimes() {
  const prayerTimes = [
    { name: "Imsak", time: "04:02" },
    { name: "Shubuh", time: "05:25" },
    { name: "Dzuhur", time: "11:38" },
    { name: "Ashar", time: "16:03" },
    { name: "Maghrib", time: "17:51" },
    { name: "Isya", time: "23:02" },
  ];

  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);

  const [countdown, setCountdown] = useState("00:00:00");

  const [preAdzan, setPreAdzan] = useState(false);
  const [isAdzan, setIsAdzan] = useState(false);
  const [isIqomah, setIsIqomah] = useState(false);

  const [iqomahTimer, setIqomahTimer] = useState(0);

  // untuk mencegah sound double
  const played = useRef(false);

  function toDate(time: string) {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // ==================================
      // CURRENT & NEXT PRAYER
      // ==================================
      let curr = null;
      let next = null;

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

      // ==================================
      // COUNTDOWN MENUJU NEXT PRAYER
      // ==================================
      if (next) {
        const target = toDate(next.time);
        let diffNext = target.getTime() - now.getTime();
        if (diffNext < 0) diffNext += 86400000; // besok

        const h = Math.floor(diffNext / 3600000);
        const m = Math.floor((diffNext % 3600000) / 60000);
        const s = Math.floor((diffNext % 60000) / 1000);

        setCountdown(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
            s
          ).padStart(2, "0")}`
        );

        // ==================================
        // PRE ADZAN BEEP 5 DETIK SEBELUM
        // ==================================
        if (diffNext <= 5000 && diffNext > 0) {
          setPreAdzan(true);
          if (!played.current) {
            console.log("🔊 BEEP BEFORE ADZAN");
            playBeepSound();
            played.current = true;
          }
        } else {
          setPreAdzan(false);
        }
      }

      // ==================================
      // LOGIC PAGE MODE MENGGUNAKAN CURRENT
      // ==================================
      if (!curr) return;

      const diffCurr = now.getTime() - toDate(curr.time).getTime();

      // ADZAN (0 - 10 detik)
      if (diffCurr >= 0 && diffCurr < 10000) {
        if (!isAdzan) {
          setIsAdzan(true);
          setIsIqomah(false);
        }
      }

      // IQOMAH (10 - 20 detik setelah adzan)
      if (curr && isAdzan && !isIqomah && diffCurr >= 10000) {
        setIsIqomah(true);
        setIqomahTimer(60);
      }

      // IQOMAH TIMER COUNTDOWN
      if (isIqomah) {
        setIqomahTimer((prev) => {
          if (prev <= 1) {
            // RESET disini (nilai tepat, tidak stale)
            setIsIqomah(false);
            setIsAdzan(false);
            played.current = false;
            return 0;
          }
          return prev - 1;
        });
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [isAdzan, isIqomah]);

  return {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    countdown,
    preAdzan,
    isAdzan,
    isIqomah,
    iqomahTimer,
  };
}
