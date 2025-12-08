import { useEffect, useState } from "react";
import { getClient, updateClient } from "../../services/masterClient";

export default function HeaderSetting() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";  

  // Ambil data saat halaman dibuka
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClient(token);
        setName(data.name ?? "");
        setLocation(data.location ?? "");
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [token]);

  // Submit ke backend
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateClient(
        {
          name,
          location,
          logo,
        },
        token
      );

      alert("Berhasil disimpan");
    } catch (err) {
      alert("Gagal update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Header Setting</h1>

      <div className="bg-yellow-100 p-8 rounded-3xl border-t-20 border-yellow-400 shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-black">
          Edit Header Masjid
        </h2>

        {/* Nama Masjid */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Nama Masjid
          </label>
          <input
            className="w-full p-3 rounded-xl border border-yellow-400"
            placeholder="Masukkan nama masjid"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Alamat Masjid */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Alamat Masjid
          </label>
          <input
            className="w-full p-3 rounded-xl border border-yellow-400"
            placeholder="Masukkan alamat masjid"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Logo */}
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-3">
            Logo Masjid
          </label>

          <label className="cursor-pointer block">
            <div className="p-6 border-2 max-w-sm border-dashed border-yellow-500 rounded-2xl flex flex-col items-center justify-center bg-white hover:bg-yellow-50">
              <p className="font-semibold text-black">Klik untuk edit logo</p>
              {logo && (
                <img
                  src={URL.createObjectURL(logo)}
                  alt="Preview Logo"
                  className="mt-3 w-32 h-32 object-contain rounded"
                  // onChange={(e) => setLogo(e.target.value)}
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setLogo(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>

        {/* Button Simpan */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-2xl shadow transition"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}
