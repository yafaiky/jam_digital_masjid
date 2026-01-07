import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireRole({ expected, children }: any) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== expected) return <Navigate to="/" replace />;

  return children;
}
  