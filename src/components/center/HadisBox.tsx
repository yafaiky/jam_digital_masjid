import { useEffect, useState } from "react";
import { getHadists } from "../../services/hadistClient";
import type { Hadist } from "../../services/hadistClient";

export default function HadisBox() {
  const [hadisList, setHadisList] = useState<Hadist[]>([]);
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState("translate-x-0");

  // ambil data dari backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHadists();

        const aktif = data.filter((h) => !h.disabled);
        setHadisList(aktif);
      } catch (err) {
        console.error("Gagal load hadist:", err);
      }
    };

    load();
  }, []);

  // animasi slide
  useEffect(() => {
    if (hadisList.length === 0) return;

    const interval = setInterval(() => {
      setSlide("-translate-x-full");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % hadisList.length);
        setSlide("translate-x-full");

        setTimeout(() => {
          setSlide("translate-x-0");
        }, 50);
      }, 300);
    }, 15000);

    return () => clearInterval(interval);
  }, [hadisList]);


  if (hadisList.length === 0) {
    return (
      <div className="text-white/60 text-center">Tidak ada hadist aktif</div>
    );
  }

  const current = hadisList[index];

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
      <div className="absolute top-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      {/* Isi Hadist */}
      <div className={`transition-transform duration-300 ${slide}`}>
        <p className="text-xl font-semibold leading-relaxed drop-shadow">
          {current.konten}
        </p>

        <p className="mt-4 text-right text-lg font-semibold text-yellow-300 drop-shadow">
          ({current.riwayat})
        </p>
      </div>

      {/* Ornamen Bottom */}
      <div className="absolute bottom-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
    </div>
  );
}
