// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import api from "../api/axios";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    api.post("/login")
      .then(res => {
        setRole(res.data.role); 
        setLoading(false);
      })
      .catch(() => {
        setRole(null);
        setLoading(false);
      });
  }, []);

  return { loading, role };
}
