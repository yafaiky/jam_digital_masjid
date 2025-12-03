import { useState } from "react";

export default function BannerSetting() {
  const MAX_SIZE_MB = 5;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  type BannerItem = {
    id: number;
    image: string;
    preview: string | null;
    fileType?: string; // ← tambahkan untuk mengetahui apakah file video atau gambar
  };

  const [banners, setBanners] = useState<BannerItem[]>([
    { id: 1, image: "/banner/banner1.jpg", preview: null },
    { id: 2, image: "/banner/banner2.jpg", preview: null },
    { id: 3, image: "/banner/banner3.jpg", preview: null },
    { id: 4, image: "/banner/banner4.jpg", preview: null },
    { id: 5, image: "/banner/banner5.jpg", preview: null },
  ]);

  // ==== UPLOAD HANDLER ====
  const handleBannerUpload = (id: number, file: File) => {
    if (!file) return;

    // batas ukuran
    if (file.size > MAX_SIZE) {
      alert(`Ukuran file terlalu besar! Max ${MAX_SIZE_MB}MB`);
      return;
    }

    const previewURL = URL.createObjectURL(file);

    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, preview: previewURL, fileType: file.type } // ← simpan tipe file
          : b
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Banner Setting</h1>

      <div className="bg-yellow-100 p-6 rounded-2xl border-t-20 border-yellow-400">
        <h2 className="text-lg font-bold mb-4">Kelola Banner Masjid</h2>

        <p className="text-black/70 mb-6">
          Anda bisa mengubah 5 banner tampilan masjid. Maksimal ukuran file:{" "}
          <b>{MAX_SIZE_MB}MB</b>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-xl shadow border">
              <h3 className="font-bold mb-3">Banner {b.id}</h3>

              {/* PREVIEW 16:9 */}
              <div className="mb-3">
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow border bg-gray-200">

                  {/* Jika video */}
                  {b.preview && b.fileType?.includes("video") ? (
                    <video
                      src={b.preview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    // Jika gambar
                    <img
                      src={b.preview ?? b.image}
                      alt="preview banner"
                      className="w-full h-full object-cover"
                    />
                  )}

                </div>
              </div>

              {/* FILE UPLOAD BOX */}
              <label className="block">
                <div
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed 
                  border-yellow-400 rounded-xl hover:bg-yellow-50 transition cursor-pointer"
                >
                  <p className="text-black font-medium text-center">
                    Klik untuk mengganti banner (Foto / Video)
                  </p>
                  <p className="text-black/60 text-sm mt-1">
                    Max size: {MAX_SIZE_MB} MB
                  </p>
                  <p className="text-xs text-black/40 mt-1">
                    Format: JPG • PNG • WebP • MP4 • WebM
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/*,video/mp4,video/webm"   // ← support video
                  onChange={(e) =>
                    handleBannerUpload(b.id, e.target.files?.[0]!)
                  }
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
         <button
          className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 
                     text-black font-semibold rounded-2xl shadow transition"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
