import React, { useState } from "react";

type Step3UploadBannersProps = {
  clientId: string;
  onFinish?: () => void;
};

const MAX_BANNER = 5;

const Step3UploadBanners: React.FC<Step3UploadBannersProps> = ({
  clientId,
  onFinish,
}) => {
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
    e.target.value = ""; // reset input
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

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Session habis, silakan login ulang");

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("banner", file); // ✅ FIELD FILE
      });

      formData.append("client_id", clientId); // ✅ FIELD ID

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

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Upload Banner</h2>
      <p>Wajib upload tepat {MAX_BANNER} banner</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={files.length >= MAX_BANNER}
      />

      <div
        style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}
      >
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: 8,
              position: "relative",
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ width: 120, height: 80, objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={loading || files.length !== MAX_BANNER}
        style={{ marginTop: 20 }}
      >
        {loading ? "Mengunggah..." : "Selesai"}
      </button>
    </div>
  );
};

export default Step3UploadBanners;
