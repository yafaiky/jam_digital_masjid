import React, { useState } from "react";

type Step1CreateClientProps = {
  onSuccess: (clientId: string) => void;
};

type MasterClientForm = {
  name: string;
  location: string;
  timezone: string;
  config_title: string;
  running_text: string;
};

const Step1CreateClient: React.FC<Step1CreateClientProps> = ({ onSuccess }) => {
  const [form, setForm] = useState<MasterClientForm>({
    name: "",
    location: "",
    timezone: "Asia/Jakarta",
    config_title: "",
    running_text: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!form.name || !form.location) {
        throw new Error("Nama masjid dan lokasi wajib diisi");
      }

      const token = localStorage.getItem("token") || "";

      if (!token) {
        throw new Error("Session habis, silakan login ulang");
      }

      const res = await fetch("http://localhost:8080/admin/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ JWT AKTIF
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat master client");
      }

      onSuccess(data.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Buat Master Client (Masjid)</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Nama Masjid</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Masjid At-Tohir"
        />
      </div>

      <div>
        <label>Lokasi</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Jakarta"
        />
      </div>

      <div>
        <label>Judul Tampilan</label>
        <input
          type="text"
          name="config_title"
          value={form.config_title}
          onChange={handleChange}
          placeholder="Masjid At Thohir"
        />
      </div>

      <div>
        <label>Running Text</label>
        <textarea
          name="running_text"
          value={form.running_text}
          onChange={handleChange}
          placeholder="Selamat datang di Masjid..."
        />
      </div>

      <button onClick={submit} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan & Lanjut"}
      </button>
    </div>
  );
};

export default Step1CreateClient;
