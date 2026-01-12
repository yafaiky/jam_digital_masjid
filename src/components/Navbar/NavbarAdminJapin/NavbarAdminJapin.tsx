import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaListUl,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    const confirmExit = window.confirm("Yakin ingin keluar dari Admin admin japin?");
    if (confirmExit) navigate("/login/admin");
  };

  // Trigger animation saat halaman masuk
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-50 text-gray-800 overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`
          w-64 bg-white/90 backdrop-blur-xl shadow-xl border-r border-gray-200
          p-6 flex flex-col
          transform transition-all duration-700 ease-out
          ${mounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
        `}
      >
        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2 tracking-wide">
          <img src="/icon.png" alt="logo" className="w-9 mt-1" />
          Admin DKM
        </h1>

        {/* MENU */}
        <nav className="flex flex-col gap-2 flex-1">
          <AdminJapin to="/admin/create" icon={<FaCog />}>
            Create Account
          </AdminJapin>

          <AdminJapin to="/admin/view" icon={<FaListUl />}>
            View All Accounts
          </AdminJapin>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            mt-6 flex items-center gap-3 px-5 py-3 rounded-xl
            bg-red-500 text-white font-semibold shadow-md
            hover:bg-red-600 active:scale-95 transition-all duration-200
            hover:scale-[1.02]
          "
        >
          <FaSignOutAlt className="text-lg animate-bounce" />
          Keluar
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          flex-1 p-10
          transform transition-all duration-700 ease-out delay-150
          ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}

function AdminJapin({ to, children, icon }: any) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300 font-medium group
            hover:scale-[1.01]
            ${
              isActive
                ? " bg-gradient-to-r from-blue-600 to-cyan-400 font-semibold text-white shadow-md scale-[1.02]"
                : "text-gray-600 hover:bg-gray-100 font-semibold"
            }
          `}
        >
          <span
            className={`
              text-lg transition-transform duration-300
              group-hover:rotate-6
              ${isActive ? "text-white" : "text-black group-hover:text-blue-500"}
            `}
          >
            {icon}
          </span>
          {children}
        </div>
      )}
    </NavLink>
  );
}
