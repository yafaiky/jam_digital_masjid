// hooks/useCreateDkm.ts
import { useState } from "react";

type DkmForm = {
  Username: string;
  Password: string;
};

const initialForm: DkmForm = {
  Username: "",
  Password: "",
};

export function useCreateDkm(
  clientId: string,
  onSuccess: () => void
) {
  const [form, setForm] = useState<DkmForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!form.Username || !form.Password) {
        throw new Error("Username dan password wajib diisi");
      }

      if (form.Password.length < 6) {
        throw new Error("Password minimal 6 karakter");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Session habis, silakan login ulang");
      }

      const res = await fetch("http://localhost:8080/admin/dkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ClientId: clientId,
          username: form.Username,
          password: form.Password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat akun DKM");
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    submit,
  };
}
