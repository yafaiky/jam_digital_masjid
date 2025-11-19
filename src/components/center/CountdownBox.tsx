import { usePrayerTimes } from "../../utils/usePrayerTimes";

export default function CountdownBox() {
  const { nextPrayer, countdown } = usePrayerTimes();

  return (
    <div className="bg-yellow-500 px-10 py-3 bg-gradient-to-r from-[#FFE100] to-[#FF8C00]
     rounded-xl shadow-md">
      <div className="text-3xl font-extrabold text-white
  bg-clip-text text-transparent tracking-wide drop-shadow">
       {nextPrayer} - {countdown}
      </div>
    </div>
  );
}
