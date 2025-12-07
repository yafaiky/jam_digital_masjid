import { useState } from "react";

export default function MiddleSetting() {
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [runningText, setRunningText] = useState("");

  const token = localStorage.getItem("token") || "";

  const handleUploadBackground = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBackgroundPreview(url);
    setBackgroundFile(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (backgroundFile) {
        formData.append("background", backgroundFile);
      }
      formData.append("running_text", runningText);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tenant/client`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal menyimpan");

      alert("Berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Middle Setting</h1>

      <div className="bg-yellow-100 p-8 rounded-3xl border-t-20 border-yellow-400 shadow-lg">

        <h2 className="text-xl font-bold mb-6">Pengaturan Background</h2>

        <div className="mb-5">
          <div className="w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow border bg-gray-200">
            {backgroundPreview ? (
              <img
                src={backgroundPreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black/40">
                Belum ada background
              </div>
            )}
          </div>
        </div>

        <label className="block mb-10">
          <div className="p-6 border-2 max-w-md border-dashed border-yellow-500 rounded-2xl
                       flex flex-col items-center justify-center bg-white hover:bg-yellow-50
                       transition cursor-pointer shadow-sm">
            <p className="font-semibold text-black">Klik untuk unggah background</p>
            <p className="text-xs text-black/60 mt-1">Max size: 2 MB</p>
            <p className="text-xs text-black/40">Format: JPG • PNG • WebP</p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadBackground(e.target.files?.[0])}
            className="hidden"
          />
        </label>

        <hr className="my-8 border-yellow-400/40" />

        <h2 className="text-xl font-bold mb-6">Pengaturan Running Text</h2>

        <label className="block text-sm font-semibold mb-2">
          Isi Running Text
        </label>

        <textarea
          className="w-full p-4 bg-white border border-yellow-400 rounded-2xl shadow-sm
                     focus:ring-2 focus:ring-yellow-500 outline-none"
          rows={3}
          placeholder="Masukkan teks berjalan..."
          value={runningText}
          onChange={(e) => setRunningText(e.target.value)}
        ></textarea>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 
                     text-black font-semibold rounded-2xl shadow transition"
        >
          Simpan Perubahan
        </button>

      </div>
    </div>
  );
}
