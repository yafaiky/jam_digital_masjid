import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaMosque,
  FaBook,
  FaImage,
  FaListUl,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmExit = window.confirm("Yakin ingin keluar dari Admin Panel DKM?");
    if (confirmExit) navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50 text-gray-800">

      {/* SIDEBAR */}
      <aside
        className="
          w-64 bg-white/90 backdrop-blur-xl shadow-xl border-r border-gray-200
          p-6 flex flex-col
        "
      >
        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2 tracking-wide">
          <FaMosque size={28} className="text-yellow-500" />
          Admin DKM
        </h1>

        {/* MENU */}
        <nav className="flex flex-col gap-2 flex-1">
          <AdminMenuItem to="/admin/header" icon={<FaCog />}>
            Header
          </AdminMenuItem>

          <AdminMenuItem to="/admin/middle" icon={<FaListUl />}>
            Middle
          </AdminMenuItem>

          <AdminMenuItem to="/admin/hadist" icon={<FaBook />}>
            Hadist
          </AdminMenuItem>

          <AdminMenuItem to="/admin/banner" icon={<FaImage />}>
            Banner
          </AdminMenuItem>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            mt-6 flex items-center gap-3 px-5 py-3 rounded-xl
            bg-red-500 text-white font-semibold shadow-md
            hover:bg-red-600 active:scale-95 transition-all
          "
        >
          <FaSignOutAlt className="text-lg" />
          Keluar
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}


function AdminMenuItem({ to, children, icon }: any) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-200 font-medium group
            ${
              isActive
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md scale-[1.02]"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          <span
            className={`
              text-lg transition-all duration-200
              ${isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700"}
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

