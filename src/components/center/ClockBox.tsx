import { useEffect, useState } from "react";

export default function ClockBox() {
  const [time, setTime] = useState("");

  useEffect(() =>  {
    function updateTime() {
      const now = new Date();
      const jam = now.getHours().toString().padStart(2, "0");
      const menit = now.getMinutes().toString().padStart(2, "0");
      setTime(`${jam}:${menit}`);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
     <div className="bg-white px-4 py-3 rounded-2xl shadow-lg">
      <h1
        className="text-8xl font-extrabold 
        bg-gradient-to-r from-[#FFE100] to-[#FF8C00]
        bg-clip-text text-transparent tracking-wide drop-shadow"
      >
        {time || "00:00"}
      </h1>
    </div>
  );
}
