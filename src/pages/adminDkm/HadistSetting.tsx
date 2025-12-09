import { useEffect, useState } from "react";
import { getHadists, toggleHadist } from "../../services/hadistClient";
import type { Hadist } from "../../services/hadistClient";

export default function HadisSetting() {
  const [hadisList, setHadisList] = useState<Hadist[]>([]);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      const data = await getHadists(token);
      setHadisList(data);
    };

    load();
  }, [token]);

  const toggle = async (id: number) => {
    const updated = hadisList.map((h) =>
      h.id === id ? { ...h, disabled: !h.disabled } : h
    );

    setHadisList(updated);

    const target = updated.find((h) => h.id === id);
    if (!target) return;

    await toggleHadist(id, target.disabled, token);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Hadist Setting</h1>

      <div className="bg-yellow-100 p-6 rounded-2xl border-t-20 border-yellow-400">
        <h2 className="text-lg font-bold mb-4">Daftar Hadist</h2>

        <p className="mb-6 text-black/70">
          Aktifkan atau nonaktifkan hadist yang ingin ditampilkan pada layar masjid.
        </p>
        
        {hadisList.map((h) => (
          <div
            key={h.id}
            className="bg-white p-5 rounded-2xl shadow border flex justify-between items-center"
          >
            <div className="flex-1 pr-6">
              <p className="font-semibold text-black/85">{h.konten}</p>
              <p className="text-sm text-black/50 italic">
                {h.riwayat} - {h.kitab}
              </p>
            </div>

            <button
              onClick={() => toggle(h.id)}
              className={`w-14 h-7 rounded-full relative
                ${!h.disabled ? "bg-green-500" : "bg-gray-400"}
              `}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                  ${!h.disabled ? "translate-x-7" : "translate-x-0"}
                `}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
