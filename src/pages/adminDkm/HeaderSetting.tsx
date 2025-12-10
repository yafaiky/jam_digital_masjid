import { useEffect, useState } from "react";
import { getClient, updateClient } from "../../services/masterClient";

export default function HeaderSetting() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // file baru
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // url dari backend
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";
  const API_URL = import.meta.env.VITE_API_URL;

  // AMBIL DATA SAAT LOAD
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClient(token);

        setName(data.name ?? "");
        setLocation(data.location ?? "");

        // tampilkan logo lama dari backend
        if (data.logo_url) {
          setLogoPreview(data.logo_url);
        } else if (data.logo) {
          setLogoPreview(`${API_URL}/storage/${data.logo}`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (token) fetchData();
  }, [token]);

  // PREVIEW SAAT PILIH FILE BARU
  const handleLogoChange = (file: File | undefined) => {
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setLogoFile(file);
    setLogoPreview(previewURL);
  };

  // SUBMIT KE BACKEND
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateClient(
        {
          name,
          location,
          logo: logoFile,
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

              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Preview Logo"
                  className="mt-3 w-32 h-32 object-contain rounded"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleLogoChange(e.target.files?.[0])
              }
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
