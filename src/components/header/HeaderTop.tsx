import HeaderMasjid from "./HeaderMasjid";
import HeaderTanggal from "./HeaderTanggal";
import { getHijriyahDate } from "../../utils/getHijriyahDate";
import { useEffect, useState } from "react";

export default function HeaderTop() {
  const [hijriyah, setHijriyah] = useState("");
  const [masehi, setMasehi] = useState("");

  useEffect(() => {
    // tanggal masehi
    const now = new Date();
    const hari = now.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setMasehi(`${hari}, ${tanggal}`);

    // tanggal hijriyah
    setHijriyah(getHijriyahDate());
  }, []);

  return (
    <div
      className="
        w-full
        flex items-center justify-between
        px-8 py-6
        bg-white/75 
        rounded-b-3xl rounded-t-none
        shadow-md
        absolute top-0 left-0
    "
    >
      {/* Kiri */}
      <HeaderMasjid
        nama="Masjid JPN"
        alamat="Jl. Btn Cijujung Permai No.11, Sukaraja, Bogor"
      />

      {/* Divider */}
      <div className="w-1 h-16 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 mx-8 rounded-3xl "></div>

      {/* Kanan */}
      <HeaderTanggal hijriyah={hijriyah} masehi={masehi} />
    </div>
  );
}
