// src/main.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./pages/login/Login";

import AdminLayout from "./pages/adminDkm/AdminPanelDkm";
import HeaderSetting from "./pages/adminDkm/HeaderSetting";
import MiddleSetting from "./pages/adminDkm/MiddleSetting";
import HadistSetting from "./pages/adminDkm/HadistSetting";
import BannerSetting from "./pages/adminDkm/BannerSetting";

import { AuthProvider } from "./context/AuthContext";
import { RequireRole } from "./routes/ProtectedRoute";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* JAM MASJID (public) */}
        <Route path="/" element={<App />} />

        {/* DKM DASHBOARD */}
        <Route
          path="/dkm"
          element={
            <RequireRole expected="dkm">
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="header" replace />} />
          <Route path="header" element={<HeaderSetting />} />
          <Route path="middle" element={<MiddleSetting />} />
          <Route path="hadist" element={<HadistSetting />} />
          <Route path="banner" element={<BannerSetting />} />
        </Route>

        {/* ADMIN SUPER */}
        <Route
          path="/admin"
          element={
            <RequireRole expected="admin">
              <div>Super Admin Dashboard</div>
            </RequireRole>
          }
        />

        {/* DISPLAY */}
        <Route
          path="/display"
          element={
            <RequireRole expected="display">
              <div>HALAMAN DISPLAY</div>
            </RequireRole>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
