import { useEffect, useState } from "react";
import { hariBesarList, getCountdown } from "../../utils/hariBesarList";

export default function HariBesar() {
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState("translate-x-0");

  // event sekarang
  const event = hariBesarList[index];
  const daysLeft = getCountdown(event.date);

  useEffect(() => {
    const interval = setInterval(() => {
      // Step 1 — keluar ke kiri
      setSlide("-translate-x-full");

      setTimeout(() => {
        // Step 2 — ganti event & reset posisi ke kanan
        setIndex((prev) => (prev + 1) % hariBesarList.length);
        setSlide("translate-x-full");

        setTimeout(() => {
          // Step 3 — masuk ke tengah
          setSlide("translate-x-0");
        }, 50);
      }, 400);
    }, 300000); // 5 menit 300000

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-34 flex justify-end">
      {/* BOX diam */}
      <div
        className="
      bg-white/10 backdrop-blur-md
      border border-yellow-400/30
      text-white px-5 py-2
      rounded-full text-xl font-semibold
      shadow-md
      overflow-hidden
      max-w-[420px]
    "
      >
        {/* TEKS YANG BERGERAK */}
        <div
          className={`
        transition-transform duration-500 ease-in-out
        whitespace-nowrap
        ${slide}
      `}
        >
          <span className="text-yellow-300 font-bold">{event.name}</span>
          <span className="opacity-80">  {daysLeft} hari lagi</span>
        </div>
      </div>
    </div>
  );
}
