import { useEffect, useState } from "react";

export default function PrayerSchedule() {
  const prayerTimes = [
    { name: "Imsak", time: "04.03" },
    { name: "Shubuh", time: "05.25" },
    { name: "Dzuhur", time: "11.38" },
    { name: "Ashar", time: "15.01" },
    { name: "Maghrib", time: "17:51" },
    { name: "Isya", time: "19:05" },
  ];

  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  useEffect(() => {
    function updatePrayer() {
      const now = getCurrentPrayer(prayerTimes);
      setCurrentPrayer(now);
    }

    updatePrayer();
    const interval = setInterval(updatePrayer, 1000); // update setiap detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-1 justify-center mt-10">
      {prayerTimes.map((p) => {
        const isActive = p.name === currentPrayer;

        return (
          <div
            key={p.name}
            className={`
              flex flex-col items-center justify-center
              w-50 h-40
              rounded-t-3xl 
              transition-all duration-300

              ${
                isActive
                  ? "bg-yellow-400 text-white shadow-xl -translate-y-6 h-46"
                  : "bg-white/60 text-black shadow"
              }
            `}
          >
            <h3 className="text-xl font-semibold tracking-wide">{p.name}</h3>
            <p className="text-4xl font-extrabold mt-2">{p.time}</p>
          </div>
        );
      })}
    </div>
  );
}

// Function helper
function getCurrentPrayer(times: { name: string; time: string }[]) {
  const now = new Date();

  const toDate = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  for (let i = 0; i < times.length; i++) {
    const curr = toDate(times[i].time);
    const next = times[i + 1] ? toDate(times[i + 1].time) : null;

    if (now >= curr && (!next || now < next)) {
      return times[i].name;
    }
  }

  return null;
}
