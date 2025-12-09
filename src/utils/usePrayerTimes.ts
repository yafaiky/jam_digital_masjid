import { useEffect, useState, useRef } from "react";
import { playBeepSound } from "./sound";

const PRE_ADZAN_SECONDS = 5; // bunyi beep sebelum adzan
const ADZAN_DURATION = 150; // durasi adzan (detik)
const IQOMAH_DURATION = 420; // lama iqomah (detik)
const KOMAT_DURATION = 40; // lama komat (detik)
const BLANK_DURATION = 60; // lama layar kosong (detik)

export function usePrayerTimes() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [prayerTimes, setPrayerTimes] = useState<any[]>([]);

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

  const played = useRef(false);
  const [iqomahStarted, setIqomahStarted] = useState(false);

  // Ambil lokasi user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => alert("Izin lokasi ditolak. Jadwal tidak akurat.")
    );
  }, []);

  // Fetch jadwal sholat API Al-Adhan setelah lokasi ditemukan
  useEffect(() => {
    if (!coords) return;

    async function loadPrayerTimes() {
      const url = `https://api.aladhan.com/v1/timings?latitude=${coords.lat}&longitude=${coords.lon}&method=20`;
      const res = await fetch(url);
      const json = await res.json();

      const t = json.data.timings;

      setPrayerTimes([
        { name: "Imsak", time: t.Imsak },
        { name: "Shubuh", time: t.Fajr },
        { name: "Dzuhur", time: t.Dhuhr },
        { name: "Ashar", time: t.Asr },
        { name: "Maghrib", time: t.Maghrib },
        { name: "Isya", time: t.Isha },
      ]);
    }

    loadPrayerTimes();
  }, [coords]);

  function toDate(time: string) {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  // Interval utama
  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerTimes.length === 0) return;

      const now = new Date();

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

      if (next) {
        const target = toDate(next.time);
        let diffNext = target.getTime() - now.getTime();
        if (diffNext < 0) diffNext += 86400000;

        const h = Math.floor(diffNext / 3600000);
        const m = Math.floor((diffNext % 3600000) / 60000);
        const s = Math.floor((diffNext % 60000) / 1000);

        setCountdown(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
            s
          ).padStart(2, "0")}`
        );

        // --- PRE ADZAN (beep sebelum adzan)
        if (diffNext <= PRE_ADZAN_SECONDS * 1000 && diffNext > 0) {
          setPreAdzan(true);
          if (!played.current) {
            playBeepSound();
            played.current = true;
          }
        } else {
          setPreAdzan(false);
        }
      }

      if (!curr) return;

      const diffCurr = now.getTime() - toDate(curr.time).getTime();

      // --- ADZAN DIMULAI
      if (!isAdzan && diffCurr >= 0 && diffCurr < ADZAN_DURATION * 1000) {
        setIsAdzan(true);
        setIsIqomah(false);
        setIsKomat(false);
        setBlankPage(false);
        played.current = false;
        setIqomahStarted(false);
      }

      // --- IQOMAH DIMULAI
      if (isAdzan && !iqomahStarted && diffCurr >= ADZAN_DURATION * 1000) {
        setIsIqomah(true);
        setIqomahTimer(IQOMAH_DURATION);
        setIqomahStarted(true);
      }

      // --- IQOMAH COUNTDOWN
      if (isIqomah) {
        setIqomahTimer((prev) => {
          if (prev <= 1) {
            setIsIqomah(false);
            setIsKomat(true);
            setKomatTimer(KOMAT_DURATION);
            return 0;
          }
          return prev - 1;
        });
      }

      // --- KOMAT COUNTDOWN
      if (isKomat) {
        setKomatTimer((prev) => {
          if (prev <= 1) {
            setIsKomat(false);
            setBlankPage(true);
            setBlankTimer(BLANK_DURATION);
            return 0;
          }
          return prev - 1;
        });
      }

      // --- BLANK PAGE COUNTDOWN
      if (blankPage) {
        setBlankTimer((prev) => {
          if (prev <= 1) {
            setBlankPage(false);
            setIsAdzan(false);
            setIsIqomah(false);
            setIsKomat(false);
            setIqomahStarted(false);
            played.current = false;
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, isAdzan, isIqomah, isKomat, blankPage, iqomahStarted]);

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
