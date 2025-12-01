import { useEffect, useState } from "react";

const islamicEvents = [
  { name: "Tahun Baru Hijriah", month: 1, day: 1 },
  { name: "Hari Asyura", month: 1, day: 10 },
  { name: "Maulid Nabi", month: 3, day: 12 },
  { name: "Isra’ Mi’raj", month: 7, day: 27 },
  { name: "Nuzulul Qur’an", month: 9, day: 17 },
  { name: "Idul Fitri", month: 10, day: 1 },
  { name: "Idul Adha", month: 12, day: 10 },
];

export function useIslamicEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    setLoading(true);

    // tanggal Gregorian hari ini (stabil)
    const now = new Date();
    const dd = now.getDate();
    const mm = now.getMonth() + 1;
    const yyyy = now.getFullYear();

    const hijriRes = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${dd}-${mm}-${yyyy}`
    );

    const hijriJson = await hijriRes.json();
    const hijriToday = hijriJson?.data?.hijri;

    if (!hijriToday) {
      console.error("Hijri Today ERROR:", hijriJson);
      setLoading(false);
      return;
    }

    const hYear = Number(hijriToday.year);

    const results = await Promise.all(
      islamicEvents.map(async (ev) => {
        const passed =
          ev.month < hijriToday.month.number ||
          (ev.month === hijriToday.month.number &&
            ev.day < Number(hijriToday.day));

        const targetYear = passed ? hYear + 1 : hYear;

        const res = await fetch(
          `https://api.aladhan.com/v1/hToG?date=${ev.day}-${ev.month}-${targetYear}`
        );
        const json = await res.json();

        if (!json.data) return null;

        const [d, m, y] = json.data.gregorian.date.split("-").map(Number);
        const gDate = new Date(y, m - 1, d);

        const today = new Date();
        const diff = Math.ceil(
          (gDate.getTime() -
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return {
          name: ev.name,
          gregorian: gDate,
          diff,
          status:
            diff === 0
              ? "Hari ini"
              : diff > 0
              ? `${diff} hari lagi`
              : `${Math.abs(diff)} hari lalu`,
        };
      })
    );

    const cleaned = results
      .filter(Boolean)
      .sort((a: any, b: any) => a.gregorian - b.gregorian); 

    setEvents(cleaned);
    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return { events, loading };
}
