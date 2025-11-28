import { useEffect, useState, useRef } from "react";
import { playBeepSound } from "./sound";

export function usePrayerTimes() {
  const prayerTimes = [
    { name: "Imsak", time: "04:02" },
    { name: "Shubuh", time: "05:25" },
    { name: "Dzuhur", time: "11:39" },
    { name: "Ashar", time: "15:34" },
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

  const [isKomat, setIsKomat] = useState(false);
  const [komatTimer, setKomatTimer] = useState(0);

  const [blankPage, setBlankPage] = useState(false);
  const [blankTimer, setBlankTimer] = useState(0);

  // Prevent double beep
  const played = useRef(false);

  // FIX FLAG → Agar IQOMAH tidak terus-terusan restart
  const [iqomahStarted, setIqomahStarted] = useState(false);

  function toDate(time: string) {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // =================================
      // CURRENT & NEXT PRAYER
      // =================================
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

      // =================================
      // COUNTDOWN NEXT PRAYER
      // =================================
      if (next) {
        const target = toDate(next.time);
        let diffNext = target.getTime() - now.getTime();
        if (diffNext < 0) diffNext += 86400000;

        const h = Math.floor(diffNext / 3600000);
        const m = Math.floor((diffNext % 3600000) / 60000);
        const s = Math.floor((diffNext % 60000) / 1000);

        setCountdown(
          `${String(h).padStart(2, "0")}:${String(m).padStart(
            2,
            "0"
          )}:${String(s).padStart(2, "0")}`
        );

        // PRE ADZAN (5 detik sebelum)
        if (diffNext <= 5000 && diffNext > 0) {
          setPreAdzan(true);

          if (!played.current) {
            playBeepSound();
            played.current = true;
          }
        } else {
          setPreAdzan(false);
        }
      }

      // =================================
      // ADZAN → IQOMAH → KOMAT → BLANK
      // =================================
      if (!curr) return;

      const diffCurr = now.getTime() - toDate(curr.time).getTime();

      // ======================
      // MASUK ADZAN
      // 0–10 detik setelah waktu masuk
      // ======================
      if (!isAdzan && diffCurr >= 0 && diffCurr < 10000) {
        setIsAdzan(true);
        setIsIqomah(false);
        setIsKomat(false);
        setBlankPage(false);
        played.current = false;
        setIqomahStarted(false); // reset awal
      }

      // ======================
      // MASUK IQOMAH (sekali saja)
      // ======================
      if (isAdzan && !iqomahStarted && diffCurr >= 10000) {
        setIsIqomah(true);
        setIqomahTimer(60);
        setIqomahStarted(true); // FIX supaya tidak looping
      }

      // ======================
      // TIMER IQOMAH
      // ======================
      if (isIqomah) {
        setIqomahTimer((prev) => {
          if (prev <= 1) {
            setIsIqomah(false);
            setIsKomat(true);
            setKomatTimer(30);
            return 0;
          }
          return prev - 1;
        });
      }

      // ======================
      // TIMER KOMAT
      // ======================
      if (isKomat) {
        setKomatTimer((prev) => {
          if (prev <= 1) {
            setIsKomat(false);
            setBlankPage(true);
            setBlankTimer(600); // 10 menit
            return 0;
          }
          return prev - 1;
        });
      }

      // ======================
      // TIMER BLANK PAGE
      // ======================
      if (blankPage) {
        setBlankTimer((prev) => {
          if (prev <= 1) {
            // RESET FULL
            setBlankPage(false);
            setIsAdzan(false);
            setIsIqomah(false);
            setIsKomat(false);
            setIqomahStarted(false); // penting!!
            played.current = false;
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAdzan, isIqomah, isKomat, blankPage, iqomahStarted]);

  return {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    countdown,
    preAdzan,

    isAdzan,
    isIqomah,
    iqomahTimer,

    isKomat,
    komatTimer,

    blankPage,
    blankTimer,
  };
}
