// hooks/useUploadBanners.ts
import { useState } from "react";

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

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Session habis, silakan login ulang");
      }

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("banner", file);
      });

      formData.append("client_id", clientId);

      const res = await fetch("http://localhost:8080/admin/banners", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal upload banner");
      }

      alert("Setup selesai 🎉");
      onFinish?.();
    } catch (err: any) {
      setError(err.message);
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
