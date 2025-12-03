export default function HeaderSetting() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Header Setting</h1>

      <div className="bg-yellow-100 p-8 rounded-3xl border-t-20 border-yellow-400 shadow-lg">

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-6 text-black">Edit Header Masjid</h2>

        {/* INPUT TITLE */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Nama Masjid</label>
          <input
            className="w-full p-3 rounded-xl border border-yellow-400 focus:ring-2 
                       focus:ring-yellow-500 outline-none bg-white shadow-sm"
            placeholder="Masukkan nama masjid"
          />
        </div>

        {/* INPUT ALAMAT */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Alamat Masjid</label>
          <input
            className="w-full p-3 rounded-xl border border-yellow-400 focus:ring-2 
                       focus:ring-yellow-500 outline-none bg-white shadow-sm"
            placeholder="Masukkan alamat masjid"
          />
        </div>

        {/* UPLOAD LOGO */}
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-3">Logo Masjid</label>

          {/* UPLOAD BOX */}
          <label className="cursor-pointer block">
            <div className="
              p-6 border-2 max-w-sm border-dashed border-yellow-500 rounded-2xl
              flex flex-col items-center justify-center bg-white hover:bg-yellow-50
              transition shadow-sm
            ">
              <p className="font-semibold text-black">Klik untuk unggah logo</p>
              <p className="text-xs text-black/60 mt-1">Format: PNG • JPG • WebP</p>
              <p className="text-xs text-black/60">Rekomendasi ukuran: 300 × 300px</p>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </label>
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
