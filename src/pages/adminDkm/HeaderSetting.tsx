import { useEffect, useState } from "react";
import { getClient, updateClient } from "../../services/masterClient";
import { FaHeading, FaMapMarkerAlt, FaImage, FaCheckCircle, FaSpinner } from "react-icons/fa";

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
        const data = await getClient();

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
      <div className="flex items-center gap-3 mb-8">
        <FaHeading className="text-4xl text-yellow-600" />
        <h1 className="text-3xl font-bold">Header Setting</h1>
      </div>

      <div className="bg-yellow-100 p-8 rounded-3xl border-t-20 border-yellow-400 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <FaHeading className="text-2xl text-yellow-600" />
          <h2 className="text-xl font-bold text-black">Edit Header Masjid</h2>
        </div>

        {/* Nama Masjid */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FaHeading className="text-yellow-600" />
            Nama Masjid
          </label>
          <input
            className="w-full p-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
            placeholder="Masukkan nama masjid"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Alamat Masjid */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <FaMapMarkerAlt className="text-yellow-600" />
            Alamat Masjid
          </label>
          <input
            className="w-full p-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
            placeholder="Masukkan alamat masjid"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Logo */}
        <div className="mt-8 pb-6 border-t border-yellow-300 pt-6">
          <label className="flex items-center gap-2 text-sm font-semibold mb-4">
            <FaImage className="text-yellow-600 text-lg" />
            Logo Masjid
          </label>

          <label className="inline-block cursor-pointer block">
            <div className="p-8 border-2 border-dashed border-yellow-400 rounded-2xl flex flex-col items-center justify-center bg-white hover:bg-yellow-50 hover:border-yellow-500 transition">
              <FaImage className="text-3xl text-yellow-500 mb-3" />
              <p className="font-semibold text-black text-center">Klik untuk edit logo</p>
              <p className="text-black/60 text-sm mt-1">JPG • PNG • WebP (Max 2MB)</p>

              {logoPreview && (
                <div className="mt-4 p-2 bg-white rounded-lg border border-yellow-300">
                  <img
                    src={logoPreview}
                    alt="Preview Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
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
          className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold rounded-2xl shadow transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>
    </div>
  );
}
