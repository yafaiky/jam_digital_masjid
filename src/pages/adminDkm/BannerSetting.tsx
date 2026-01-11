import { useEffect, useState } from "react";
import { getBanners, updateBanner } from "../../services/bannerClient";
import { FaImages, FaCloudUploadAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";
import type { Banner } from "../../services/bannerClient";

export default function BannerSetting() {
  const MAX_SIZE_MB = 5;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  const token = localStorage.getItem("token") || "";

  type BannerItem = {
    id: number;
    image: string;
    preview: string | null;
    fileType?: string;
    file?: File;
  };

  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const loadBanners = async () => {
    try {
      const data = await getBanners();

      const mapped = data.map((b: Banner) => ({
        id: b.id,
        image: b.url,
        preview: null,
      }));

      setBanners(mapped);
    } catch (err) {
      console.error("Gagal load banner:", err);
    }
  };

  useEffect(() => {
    if (token) loadBanners();
  }, [token]);

  // HANDLE FILE UPLOAD
  const handleBannerUpload = (id: number, file: File) => {
    if (!file) return;

    if (file.size > MAX_SIZE) {
      alert(`Ukuran file terlalu besar! Max ${MAX_SIZE_MB}MB`);
      return;
    }

    const previewURL = URL.createObjectURL(file);

    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, preview: previewURL, fileType: file.type, file }
          : b
      )
    );
  };

  // SAVE KE SERVER (PUT)
  const handleSave = async () => {
    try {
      setIsSaving(true);
      for (const banner of banners) {
        if (banner.file) {
          await updateBanner(banner.id, banner.file);
        }
      }

      alert("Semua banner berhasil disimpan");
      await loadBanners();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan banner");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FaImages className="text-4xl text-yellow-600" />
        <h1 className="text-3xl font-bold">Banner Setting</h1>
      </div>

      <div className="bg-yellow-100 p-6 rounded-2xl border-t-20 border-yellow-400 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaImages className="text-2xl text-yellow-600" />
          <h2 className="text-lg font-bold">Kelola Banner Masjid</h2>
        </div>

        <p className="text-black/70 mb-6">
          Anda bisa mengubah banner tampilan masjid. Maksimal ukuran file:{" "}
          <b>{MAX_SIZE_MB}MB</b>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-xl shadow-md border-2 border-yellow-200 hover:border-yellow-400 transition">
              <div className="flex items-center gap-2 mb-3">
                <FaImages className="text-yellow-600 text-lg" />
                <h3 className="font-bold text-lg">Banner {b.id}</h3>
              </div>

              {/* PREVIEW */}
              <div className="mb-3">
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow border bg-gray-200 relative group">
                  {b.preview && b.fileType?.includes("video") ? (
                    <video
                      key={`video-${b.id}-${b.preview}`}
                      src={b.preview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      key={`image-${b.id}-${b.preview ?? b.image}`}
                      src={b.preview ?? b.image}
                      alt="preview banner"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {b.file && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
                      <FaCheckCircle className="text-xs" />
                      Siap Upload
                    </div>
                  )}
                </div>
              </div>

              {/* UPLOAD BOX */}
              <label className="block">
                <div
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed 
                  border-yellow-400 rounded-xl hover:bg-yellow-50 hover:border-yellow-500 transition cursor-pointer bg-white"
                >
                  <FaCloudUploadAlt className="text-3xl text-yellow-500 mb-2" />
                  <p className="text-black font-medium text-center">
                    Klik untuk mengganti banner
                  </p>
                  <p className="text-black/60 text-sm mt-1">
                    (Foto / Video - Max {MAX_SIZE_MB}MB)
                  </p>
                  <p className="text-xs text-black/40 mt-1">
                    JPG • PNG • WebP • MP4 • WebM
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/*,video/mp4,video/webm"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleBannerUpload(b.id, e.target.files[0])
                  }
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400
                     text-black font-semibold rounded-2xl shadow transition flex items-center justify-center gap-2"
        >
          {isSaving ? (
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
