import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RedirectRoot() {
  const { user } = useAuth();

  // jika tidak ada user → arahkan ke login
  if (!user) return <Navigate to="/login" replace />;

  // jika sudah login → arahkan sesuai role
  if (user.role === "dkm") return <Navigate to="/dkm" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "display") return <Navigate to="/display" replace />;

  return <Navigate to="/login" replace />;
}
