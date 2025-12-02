import { Routes, Route } from "react-router-dom";
import DashboardJam from "./pages/DashboardJam";
import Admin from "./pages/AdminPanelDkm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardJam />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
