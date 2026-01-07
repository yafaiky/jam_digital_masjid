// components/Step2CreateDkm.tsx
import React from "react";
import { useCreateDkm } from "../../../hooks/useCreateDKM";

type Step2CreateDkmProps = {
  clientId: string;
  onSuccess: () => void;
};

const Step2CreateDkm: React.FC<Step2CreateDkmProps> = ({
  clientId,
  onSuccess,
}) => {
  const { form, loading, error, handleChange, submit } =
    useCreateDkm(clientId, onSuccess);

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Buat Akun DKM</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Username</label>
        <input
          type="text"
          name="Username"
          value={form.Username}
          onChange={handleChange}
          placeholder="Majid Nurul Mustofa"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="Password"
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
