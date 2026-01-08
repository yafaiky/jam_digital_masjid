// hooks/useCreateDkm.ts
import { useState } from "react";
import api from "../api/axios";

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

      await api.post("/admin/dkm", {
        ClientId: clientId,
        username: form.Username,
        password: form.Password,
      });

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Terjadi kesalahan");
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
