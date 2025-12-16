import React, { useState } from "react";

type Step2CreateDkmProps = {
  clientId: string;
  onSuccess: () => void;
};

type DkmForm = {
  Username: string;
  Password: string;
};

const Step2CreateDkm: React.FC<Step2CreateDkmProps> = ({
  clientId,
  onSuccess,
}) => {
  const [form, setForm] = useState<DkmForm>({
    Username: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!form.Username || !form.Password) {
        throw new Error("Username dan password wajib diisi");
      }

        const token = localStorage.getItem("token") || "";

      if (form.Password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      const res = await fetch("http://localhost:8080/admin/dkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          client_id: clientId,
          username: form.Username,
          password: form.Password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat akun DKM");
      }

      // 👉 lanjut ke step 3
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Buat Akun DKM</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.Username}
          onChange={handleChange}
          placeholder="Majid Nurul Mustofa"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.Password}
          onChange={handleChange}
          placeholder="Minimal 6 karakter"
        />
      </div>

      <button onClick={submit} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan & Lanjut"}
      </button>
    </div>
  );
};

export default Step2CreateDkm;
