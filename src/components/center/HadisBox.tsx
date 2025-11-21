import { useEffect, useState } from "react";

export default function HadisBox() {
  const hadisList = [
    {
      text: "“Ketahuilah bahwasannya kemenangan itu bersama kesabaran, dan jalan keluar itu bersama kesulitan. Dan sesungguhnya bersama kesulitan ada kemudahan.”",
      source: "(HR. Tirmidzi)",
    },
    {
      text: "“Sesungguhnya Allah tidak melihat rupa dan harta kalian, namun Dia melihat hati dan amal kalian.”",
      source: "(HR. Muslim)",
    },
    {
      text: "“Orang yang kuat adalah yang mampu mengendalikan dirinya saat marah.”",
      source: "(HR. Bukhari dan Muslim)",
    },
    {
      text: "“Senyumanmu untuk saudaramu adalah sedekah.”",
      source: "(HR. Tirmidzi)",
    },
    {
      text: "“Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.”",
      source: "(HR. Bukhari dan Muslim)",
    },
  ];

  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState("translate-x-0");

  useEffect(() => {
    const interval = setInterval(() => {
      // Slide keluar ke kiri
      setSlide("-translate-x-full");

      setTimeout(() => {
        // Pindah hadis
        setIndex((prev) => (prev + 1) % hadisList.length);

        // Reset ke kanan (untuk animasi masuk)
        setSlide("translate-x-full");

        setTimeout(() => {
          // Slide masuk dari kanan ke tengah
          setSlide("translate-x-0");
        }, 50);
      }, 300);
    }, 15000); // 1 menit

    return () => clearInterval(interval);
  }, []);

  const currentHadis = hadisList[index];

  return (
    <div
      className="
      relative overflow-hidden
      bg-gradient-to-br from-white/20 to-white/5
      p-6 rounded-3xl shadow-xl
      border border-white/40
      backdrop-blur-md
      text-white
    "
    >
      {/* Ornamen Top */}
      <div className="absolute top-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

      {/* Isi Hadis dengan animasi slide */}
      <div
        className={`
          transition-transform duration-300
          ${slide}
        `}
      >
        <p className="text-xl font-semibold leading-relaxed drop-shadow">
          {currentHadis.text}
        </p>

        <p className="mt-4 text-right text-lg font-semibold text-yellow-300 drop-shadow">
          {currentHadis.source}
        </p>
      </div>

      {/* Ornamen Bottom */}
      <div className="absolute bottom-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>
  );
}
