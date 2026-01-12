// hooks/useUploadBanners.ts
import { useCallback, useRef, useState } from "react";
import api from "../api/axios";

const MAX_BANNER = 5;

export function useUploadBanners(
  clientId: string,
  onFinish?: () => void
) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const hasSucceededRef = useRef(false);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const selectedFiles = Array.from(e.target.files || []);

    setFiles((prev) => {
      if (prev.length + selectedFiles.length > MAX_BANNER) {
        setError(`Maksimal ${MAX_BANNER} banner`);
        return prev;
      }
      return [...prev, ...selectedFiles];
    });
    e.target.value = "";
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const submit = useCallback(async () => {
    // Prevent multiple submissions
    if (isSubmittingRef.current || loading || hasSucceededRef.current) {
      return;
    }

    setError(null);

    if (files.length !== MAX_BANNER) {
      setError(`Harus upload tepat ${MAX_BANNER} banner`);
      return;
    }

    try {
      isSubmittingRef.current = true;
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("banner", file);
      });

      formData.append("client_id", clientId);

      await api.post("/admin/banners", formData);

      // Mark as succeeded before calling onFinish
      hasSucceededRef.current = true;

      alert("Setup selesai 🎉");
      onFinish?.();
    } catch (err: any) {
      isSubmittingRef.current = false;
      setLoading(false);
      setError(err.response?.data?.error || err.message || "Terjadi kesalahan");
    }
  }, [files, loading, clientId, onFinish]);

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
