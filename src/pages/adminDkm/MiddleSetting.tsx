import { useState, useEffect } from "react";
import { getClient, updateClient } from "../../services/masterClient";
import { useUploadSound } from "../../hooks/useUploadSound";
import {
  FaPlay,
  FaTrash,
  FaVolumeUp,
  FaHeadphones,
  FaImage,
  FaFont,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function MiddleSetting() {
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [runningText, setRunningText] = useState("");
  const [soundUrl, setSoundUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const token = localStorage.getItem("token") || "";
  const API_URL = import.meta.env.VITE_API_URL;

  // Load data function
  const loadData = async () => {
    try {
      const data = await getClient();

      // running text
      setRunningText(data.running_text || "");

      // tampilkan background lama
      if (data.background_url) {
        setBackgroundPreview(data.background_url);
      } else if (data.config_background) {
        setBackgroundPreview(`${API_URL}/storage/${data.config_background}`);
      }

      // tampilkan sound lama
      if (data.sound_url) {
        setSoundUrl(data.sound_url);
      } else if (data.config_sound_alert) {
        setSoundUrl(`${API_URL}/storage/${data.config_sound_alert}`);
      }
    } catch (err) {
      console.error("Gagal load data:", err);
    }
  };

  const {
    soundData,
    error: soundError,
    handleSoundUpload,
    removeSoundFile,
    playPreview,
    playing,
    submit: submitSound,
  } = useUploadSound(() => {
    // Reload sound URL after save
    loadData();
  });

  const handleUploadBackground = (file: File | undefined) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setBackgroundPreview(url);
    setBackgroundFile(file);
  };

  const handleSubmitAll = async () => {
    try {
      setIsSaving(true);
      // 1. Simpan running text & background
      await updateClient({
        running_text: runningText,
        config_background: backgroundFile,
      });

      // 2. Simpan sound jika ada file baru
      if (soundData.soundFile) {
        await submitSound();
      }

      alert("Semua pengaturan berhasil disimpan");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan pengaturan");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FaImage className="text-4xl text-yellow-600" />
        <h1 className="text-3xl font-bold">Middle Setting</h1>
      </div>

      {/* section middle setting keseluruhan */}
      <div className="bg-yellow-100 p-8 rounded-3xl border-t-20 border-yellow-400 shadow-lg space-y-8">
        {/* Background Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaImage className="text-yellow-600 text-2xl" />
            <h2 className="text-xl font-bold">Pengaturan Background</h2>
          </div>

          {/* Preview Background */}
          <div className="mb-4">
            <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-md border-2 border-yellow-200 bg-gray-200">
              {backgroundPreview ? (
                <img
                  src={backgroundPreview}
                  className="w-full h-full object-cover"
                  alt="Preview background"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  Belum ada background
                </div>
              )}
            </div>
          </div>

          {/* Upload Background */}
          <label className="inline-block">
            <div
              className="p-6 border-2 border-dashed border-yellow-400 rounded-xl
                       flex flex-col items-center justify-center bg-white hover:bg-yellow-50
                       transition cursor-pointer hover:border-yellow-500"
            >
              <FaCloudUploadAlt className="text-3xl text-yellow-500 mb-2" />
              <p className="font-semibold text-black text-center">
                Klik untuk unggah background
              </p>
              <p className="text-xs text-black/60 mt-1">Max 2MB • JPG • PNG • WebP</p>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadBackground(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        </div>

        <hr className="border-yellow-300" />

        {/* Running Text Section */}
        <div>
          <label className="flex items-center gap-3 text-xl font-bold mb-4">
            <FaFont className="text-yellow-600 text-2xl" />
            Pengaturan Running Text
          </label>

          <textarea
            className="w-full p-4 bg-white border-2 border-yellow-300 rounded-xl shadow-sm
                       focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
            rows={3}
            placeholder="Masukkan teks berjalan..."
            value={runningText}
            onChange={(e) => setRunningText(e.target.value)}
          />
        </div>

        <hr className="border-yellow-300" />

        {/* Sound Alert Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaVolumeUp className="text-yellow-600 text-2xl" />
            <h2 className="text-xl font-bold">Pengaturan Suara Alert Jam</h2>
          </div>

          {/* Error Alert */}
          {soundError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              <span>{soundError}</span>
            </div>
          )}

          {/* Current Sound Display */}
          {soundUrl && !soundData.soundFile && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <div className="flex items-center gap-2 mb-3">
                <FaHeadphones className="text-yellow-600 text-lg" />
                <p className="text-sm font-semibold text-yellow-700">✅ Suara tersimpan</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const audio = new Audio(soundUrl);
                  audio.play();
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg 
                         flex items-center gap-2 transition text-sm font-semibold"
              >
                <FaPlay className="text-xs" />
                Dengarkan Suara Saat Ini
              </button>
            </div>
          )}

          {/* Sound File Preview */}
          {soundData.soundFile && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-yellow-700 text-sm">
                    📁 {soundData.soundFile.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Durasi: {soundData.soundDuration?.toFixed(2)}s / 5s max
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeSoundFile}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      soundData.soundDuration
                        ? (soundData.soundDuration / 5) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

              {/* Play Preview */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={playPreview}
                  disabled={playing}
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400
                           text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
                >
                  <FaPlay className="text-xs" />
                  {playing ? "Memutar..." : "Preview"}
                </button>
              </div>
            </div>
          )}

          {/* Upload Sound */}
          <label className="inline-block mb-4">
            <div
              className="p-6 border-2 border-dashed border-yellow-400 rounded-xl
                       flex flex-col items-center justify-center bg-white hover:bg-yellow-50
                       transition cursor-pointer hover:border-yellow-500"
            >
              <FaVolumeUp className="text-3xl text-yellow-500 mb-2" />
              <p className="font-semibold text-black text-center">
                Klik untuk unggah suara alert
              </p>
              <p className="text-xs text-black/60 mt-1">
                Max 5 detik • 5MB • MP3 • WAV • OGG • WebM • M4A
              </p>
            </div>

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleSoundUpload(e.target.files?.[0])}
              className="hidden"
              disabled={isSaving}
            />
          </label>
        </div>

        {/* Save All Button */}
        <button
          onClick={handleSubmitAll}
          disabled={isSaving}
          className=" px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400
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
              Simpan Semua Pengaturan
            </>
          )}
        </button>

        <p className="text-xs text-yellow-700 bg-yellow-50 p-3 rounded-lg">
          💡 Suara alert akan diputar saat waktu adzan tiba. Durasi maksimal 5 detik untuk efisiensi.
        </p>
      </div>
    </div>
  );
}
