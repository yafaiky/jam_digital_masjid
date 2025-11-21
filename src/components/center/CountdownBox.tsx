import { usePrayerTimes } from "../../utils/usePrayerTimes";

export default function CountdownBox() {
  const { nextPrayer, countdown } = usePrayerTimes();

  return (
    <div className="bg-gradient-to-r from-[#FFE100] to-[#FF8C00]
      px-10 py-3 rounded-xl shadow-md">
      
      <div
        className="
        text-3xl font-extrabold bg-clip-text text-white drop-shadow
        font-mono tabular-nums tracking-wide 
        w-[260px] text-center
        "
      >
        {nextPrayer} {countdown}
      </div>
    </div>
  );
}
