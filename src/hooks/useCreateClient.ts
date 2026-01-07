// hooks/useCreateClient.ts
import { useState } from "react";

export type MasterClientForm = {
  name: string;
  location: string;
  timezone: string;
  config_title: string;
  running_text: string;
};

const initialForm: MasterClientForm = {
  name: "",
  location: "",
  timezone: "Asia/Jakarta",
  config_title: "",
  running_text: "",
};

export function useCreateClient(onSuccess: (id: string) => void) {
  const [form, setForm] = useState<MasterClientForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!form.name || !form.location) {
        throw new Error("Nama masjid dan lokasi wajib diisi");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Session habis, silakan login ulang");
      }

      const res = await fetch("http://localhost:8080/admin/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  return {
    form,
    loading,
    error,
    handleChange,
    submit,
  };
}
