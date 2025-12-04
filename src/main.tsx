// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App"; // Halaman Jam Masjid
import Login from "./pages/login/Login";
import "./index.css";

import AdminLayout from "./pages/adminDkm/AdminPanelDkm";
import HeaderSetting from "./pages/adminDkm/HeaderSetting";
import MiddleSetting from "./pages/adminDkm/MiddleSetting";
import HadistSetting from "./pages/adminDkm/HadistSetting";
import BannerSetting from "./pages/adminDkm/BannerSetting";

import { useAuth } from "./hooks/useAuth";

// 🔒 Protected Route (disatukan)
function ProtectedRoute({ role: expected, children }: { role: string; children: React.ReactNode }) {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading…</p>;
  if (role !== expected) return <Navigate to="/login" />;

  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* HALAMAN JAM MASJID */}
      <Route path="/" element={<App />} />

      {/* ADMIN DKM (PROTECTED) */}
      <Route 
        path="/admin"
        element={
          <ProtectedRoute role="dkm">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="header" replace />} />
        <Route path="header" element={<HeaderSetting />} />
        <Route path="middle" element={<MiddleSetting />} />
        <Route path="hadist" element={<HadistSetting />} />
        <Route path="banner" element={<BannerSetting />} />
      </Route>

      {/* ADMIN SUPER? */}
      {/* contoh jika punya dashboard super admin */}
      {/* 
      <Route
        path="/super"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> 
      */}

    </Routes>
  </BrowserRouter>
);
