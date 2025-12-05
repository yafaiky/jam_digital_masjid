// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireRole({
  expected,
  children,
}: {
  expected: string;
  children: React.ReactNode;
}) {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (role !== expected) return <Navigate to="/login" />;

  return <>{children}</>;
}
