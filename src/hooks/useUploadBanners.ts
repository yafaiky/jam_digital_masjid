// hooks/useUploadBanners.ts
import { useState } from "react";
import api from "../api/axios";

const MAX_BANNER = 5;

export function useUploadBanners(
  clientId: string,
  onFinish?: () => void
) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const selectedFiles = Array.from(e.target.files || []);

    if (files.length + selectedFiles.length > MAX_BANNER) {
      setError(`Maksimal ${MAX_BANNER} banner`);
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async () => {
    setError(null);

    if (files.length !== MAX_BANNER) {
      setError(`Harus upload tepat ${MAX_BANNER} banner`);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("banner", file);
      });

      formData.append("client_id", clientId);

      await api.post("/admin/banners", formData);

      alert("Setup selesai 🎉");
      onFinish?.();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return {
    files,
    loading,
    error,
    maxBanner: MAX_BANNER,
    handleUpload,
    removeFile,
    submit,
  };
}
