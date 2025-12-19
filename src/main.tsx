// src/main.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import App from "./App";
import Protected from "./routes/RedirectRoot";
import Login from "./pages/login/Login";
import AdminLogin from "./pages/login/loginAdmin";

// display
import DisplayMasjid from "./pages/DisplayMasjidDkm/DashboardJam"

// import DisplayAdmin from "./App";
import AdminJapin from "./pages/adminJapin/adminJapin";
import AdminLayout from "./pages/adminDkm/AdminPanelDkm"; 
import HeaderSetting from "./pages/adminDkm/HeaderSetting";
import MiddleSetting from "./pages/adminDkm/MiddleSetting";
import HadistSetting from "./pages/adminDkm/HadistSetting";
import BannerSetting from "./pages/adminDkm/BannerSetting";
import LaporanKeuanganMajid from "./pages/adminDkm/LaporanKeuanganMajid";

// import admin japin
import CreateAkunMasjid from "./pages/adminJapin/CreateDkm/SetupWizard";
import ViewAkunMasjid from "./pages/adminJapin/viewAkunMasjid";

import { AuthProvider } from "./context/AuthContext";
import { RequireRole } from "./routes/ProtectedRoute";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* JAM MASJID (public) */}
        <Route path="/" element={<Protected />} />

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
          {/* <Route path="dkm" element={<AdminLayout />} /> */}
          <Route path="header" element={<HeaderSetting />} />
          <Route path="middle" element={<MiddleSetting />} />
          <Route path="hadist" element={<HadistSetting />} />
          <Route path="banner" element={<BannerSetting />} />
          <Route path="laporan-keuangan" element={<LaporanKeuanganMajid />} />
        </Route>

        {/* ADMIN SUPER */}
        <Route
          path="/admin"
          element={
            <RequireRole expected="admin">
              <AdminJapin />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="/admin/create" replace />} /> 
          <Route path="create" element={<CreateAkunMasjid />} />
          <Route path="view" element={<ViewAkunMasjid />} />
        </Route>

        {/* DISPLAY */}
        <Route
          path="/display"
          element={
            <RequireRole expected="display">
              <DisplayMasjid />
            </RequireRole>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
