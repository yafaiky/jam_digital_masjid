// components/Step3UploadBanners.tsx
import React from "react";
import { useUploadBanners } from "../../../hooks/useUploadBanners";

type Step3UploadBannersProps = {
  clientId: string;
  onFinish?: () => void;
};

const Step3UploadBanners: React.FC<Step3UploadBannersProps> = ({
  clientId,
  onFinish,
}) => {
  const {
    files,
    loading,
    error,
    maxBanner,
    handleUpload,
    removeFile,
    submit,
  } = useUploadBanners(clientId, onFinish);

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Upload Banner</h2>
      <p>Wajib upload tepat {maxBanner} banner</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={files.length >= maxBanner}
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
        disabled={loading || files.length !== maxBanner}
        style={{ marginTop: 20 }}
      >
        {loading ? "Mengunggah..." : "Selesai"}
      </button>
    </div>
  );
};

export default Step3UploadBanners;
