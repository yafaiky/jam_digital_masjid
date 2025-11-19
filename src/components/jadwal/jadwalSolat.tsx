import { usePrayerTimes } from "../../utils/usePrayerTimes";

export default function PrayerSchedule() {
  const { prayerTimes, currentPrayer } = usePrayerTimes();
  
  return (
    <div className="flex gap-1 justify-center items-end">
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
                ? "bg-gradient-to-r from-[#FFE100] to-[#FF8C00] text-white shadow-xl h-45 w-53"
                : "bg-white/60 text-black shadow"
            }
          `}
          >
            <h3 className="text-2xl font-semibold tracking-wide">{p.name}</h3>
            <p className="text-6xl font-extrabold text-shadow-lg mt-2">{p.time}</p>
          </div>
        );
      })}
    </div>
  );
}