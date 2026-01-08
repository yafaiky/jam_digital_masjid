import { useEffect, useState } from "react";
import { getClient } from "../../services/masterClient";

export default function RunningTxt() {
  const [text, setText] = useState("Memuat running text...");


  useEffect(() => {
    async function loadText() {
      try {
        const data = await getClient();
        setText(data.running_text || "Selamat datang di masjid");
      } catch (err) {
        console.error("Gagal ambil running text", err);
      }
    }

    loadText();

    // ✅ Auto refresh tiap 5 detik
    const interval = setInterval(loadText, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap bg-white text-black py-2 uppercase font-semibold">
      <div
        className="inline-block"
        style={{
          animation: `marquee 60s linear infinite`,
        }}
      >
        {text}
      </div>

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
