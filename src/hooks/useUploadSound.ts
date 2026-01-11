// hooks/useUploadSound.ts
import { useState } from "react";
import api from "../api/axios";
import { getAudioDuration } from "../utils/sound";

const MAX_SOUND_DURATION = 6; // 6 detik
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type SoundData = {
  soundFile: File | null;
  soundPreview: string | null;
  soundDuration: number | null;
};

export function useUploadSound(onSaved?: () => void) {
  const [soundData, setSoundData] = useState<SoundData>({
    soundFile: null,
    soundPreview: null,
    soundDuration: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleSoundUpload = async (file: File | undefined) => {
    if (!file) return;

    setError(null);

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      setError(`Ukuran file maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    // Validasi format audio
    const validFormats = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
      "audio/webm",
      "audio/m4a",
    ];
    if (!validFormats.includes(file.type)) {
      setError("Format audio tidak didukung. Gunakan: MP3, WAV, OGG, WebM, M4A");
      return;
    }

    try {
      // Get audio duration
      const duration = await getAudioDuration(file);

      if (duration > MAX_SOUND_DURATION) {
        setError(`Durasi audio maksimal ${MAX_SOUND_DURATION} detik. Durasi file: ${duration.toFixed(2)}s`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);

      setSoundData({
        soundFile: file,
        soundPreview: preview,
        soundDuration: duration,
      });
    } catch (err: any) {
      setError(err.message || "Gagal memproses file audio");
    }
  };

  const removeSoundFile = () => {
    if (soundData.soundPreview) {
      URL.revokeObjectURL(soundData.soundPreview);
    }
    setSoundData({
      soundFile: null,
      soundPreview: null,
      soundDuration: null,
    });
  };

  const playPreview = async () => {
    if (!soundData.soundPreview) return;

    try {
      setPlaying(true);
      const audio = new Audio(soundData.soundPreview);
      audio.onended = () => setPlaying(false);
      await audio.play();
    } catch (err) {
      console.error("Error playing preview:", err);
      setPlaying(false);
    }
  };

  const submit = async () => {
    if (!soundData.soundFile) {
      setError("Pilih file audio terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.put("/tenant/client", {
        config_sound_alert: soundData.soundFile,
      });

      alert("Sound berhasil disimpan ✅");
      removeSoundFile();
      onSaved?.();
    } catch (err: any) {
      setError(
        err.response?.data?.error || err.message || "Gagal menyimpan sound"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    soundData,
    loading,
    error,
    playing,
    handleSoundUpload,
    removeSoundFile,
    playPreview,
    submit,
  };
}
