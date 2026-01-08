// hooks/useCreateClient.ts
import { useState } from "react";
import api from "../api/axios";

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

      const res = await api.post("/admin/client", form);
      onSuccess(res.data.id);
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
