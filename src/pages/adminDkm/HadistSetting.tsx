import { useState } from "react";

export default function HadisSetting() {
  const [hadisList, setHadisList] = useState([
    {
      id: 1,
      text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.",
      source: "(HR. Tirmidzi)",
      enabled: true,
    },
    {
      id: 2,
      text: "Sesungguhnya Allah tidak melihat rupa dan hartamu, tetapi melihat hati dan amalmu.",
      source: "(HR. Muslim)",
      enabled: true,
    },
    {
      id: 3,
      text: "Barangsiapa beriman kepada Allah dan hari akhir maka berkatalah yang baik atau diam.",
      source: "(HR. Bukhari dan Muslim)",
      enabled: false,
    },
  ]);

  const toggleHadis = (id: number) => {
    setHadisList(
      hadisList.map((h) =>
        h.id === id ? { ...h, enabled: !h.enabled } : h
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Hadist Setting</h1>

      <div className="bg-yellow-100 p-6 rounded-2xl border-t-20 border-yellow-400">
        <h2 className="text-lg font-bold mb-4">Daftar Hadist</h2>

        <p className="mb-6 text-black/70">
          Aktifkan atau nonaktifkan hadist yang ingin ditampilkan pada layar masjid.
        </p>

        {/* LIST HADIST */}
        <div className="space-y-5">
          {hadisList.map((hadis) => (
            <div
              key={hadis.id}
              className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg 
              transition-all duration-300 flex justify-between items-center"
            >
              {/* TEKS HADIST */}
              <div className="flex-1 pr-6">
                <p className="font-semibold text-black/85 leading-relaxed">
                  {hadis.text}
                </p>
                <p className="text-black/50 text-sm mt-1 italic">
                  {hadis.source}
                </p>
              </div>

              {/* TOGGLE SWITCH */}
              <button
                onClick={() => toggleHadis(hadis.id)}
                className={`
                  w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner
                  ${hadis.enabled ? "bg-green-500" : "bg-gray-400"}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow 
                    transform transition-all duration-300
                    ${hadis.enabled ? "translate-x-7" : "translate-x-0"}
                  `}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
