import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import AdminLayout from "./pages/adminDkm/AdminPanelDkm";
import HeaderSetting from "./pages/adminDkm/HeaderSetting";
import MiddleSetting from "./pages/adminDkm/MiddleSetting";
import HadistSetting from "./pages/adminDkm/HadistSetting";
import BannerSetting from "./pages/adminDkm/BannerSetting";


ReactDOM.createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
    <Routes>
      {/* HALAMAN JAM MASJID */}
      <Route path="/" element={<App />} />

      {/* ADMIN DKM */}
      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<Navigate to="header" replace />} />
        <Route path="header" element={<HeaderSetting />} />
        <Route path="middle" element={<MiddleSetting />} />
        <Route path="hadist" element={<HadistSetting />} />
        <Route path="banner" element={<BannerSetting />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
