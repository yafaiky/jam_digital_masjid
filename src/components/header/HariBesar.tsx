import { useEffect, useState } from "react";
import { useIslamicEvents } from "../../utils/hariBesarList";

export default function HariBesar() {
  const { events, loading } = useIslamicEvents();

  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState("translate-x-0");

  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setSlide("-translate-x-full");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % events.length);
        setSlide("translate-x-full");

        setTimeout(() => setSlide("translate-x-0"), 50);
      }, 400);
    }, 15000);

    return () => clearInterval(interval);
  }, [events]);

  if (loading || events.length === 0) {
    return (
      <div className="mt-34 flex justify-end">
        <div className="bg-white/10 border border-yellow-400/30 px-5 py-2 rounded-full text-white">
          Memuat hari besar Islam...
        </div>
      </div>
    );
  }

  const event = events[index];

  return (
    <div className="mt-34 flex justify-end">
      <div
        className="
      bg-white/10 
      border border-yellow-400/30
      text-white px-5 py-2
      rounded-full text-xl font-semibold
      shadow-md
      overflow-hidden
      max-w-[420px]
    "
      >
        <div
          className={`
        transition-transform duration-500 ease-in-out
        whitespace-nowrap
        ${slide}
      `}
        >
          <span className="text-yellow-300 font-bold">{event.name}</span>
          <span className="opacity-80"> — {event.status}</span>
        </div>
      </div>
    </div>
  );
}
