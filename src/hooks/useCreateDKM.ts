// hooks/useCreateDkm.ts
import { useCallback, useRef, useState } from "react";
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
  const isSubmittingRef = useRef(false);
  const hasSucceededRef = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const submit = useCallback(async () => {
    // Prevent multiple submissions
    if (isSubmittingRef.current || loading || hasSucceededRef.current) {
      return;
    }

    try {
      isSubmittingRef.current = true;
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

      // Mark as succeeded before calling onSuccess
      hasSucceededRef.current = true;
      
      // Call onSuccess immediately
      onSuccess();
    } catch (err: any) {
      isSubmittingRef.current = false;
      setLoading(false);
      setError(err.response?.data?.error || err.message || "Terjadi kesalahan");
    }
  }, [form, loading, onSuccess]);

  return {
    form,
    loading,
    error,
    handleChange,
    submit,
  };
}
