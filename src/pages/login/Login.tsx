// src/pages/login/Login.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { FiUser, FiLock, FiTv, FiSmartphone } from "react-icons/fi"; // ikon react
import { FaMosque } from "react-icons/fa";

import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // trigger fade-in animation
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const device = e.target.device.value; // "hp" atau "tv"

    const res = await axios.post("http://10.2.22.23:8080/login", {
      username,
      password,
      device,
    });

    login(res.data.token, res.data.role);

    navigate(`/${res.data.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div
        className={`w-full max-w-md transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-xl ring-1 ring-orange-100 overflow-hidden transform transition duration-300 hover:scale-[1.01]">
          {/* Header */}
          <div className="px-8 py-6 sm:px-10 sm:py-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-400 flex items-center justify-center text-white text-lg font-bold shadow-md transform transition-transform duration-300">
              <FaMosque size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Selamat Datang
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Pada Jam digital Masjid JAPIN
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 pb-8 sm:px-10 sm:pb-10 flex flex-col gap-4"
          >
            <div className="relative flex items-center gap-2">
              <FiUser className="text-gray-400 absolute left-3" size={18} />
              <input
                name="username"
                placeholder="username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-shadow duration-200 shadow-sm"
              />
            </div>

            <div className="relative flex items-center gap-2">
              <FiLock className="text-gray-400 absolute left-3" size={18} />
              <input
                name="password"
                placeholder="password"
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-shadow duration-200 shadow-sm"
              />
            </div>

            <div className="relative flex items-center gap-2">
              <FiTv className="text-gray-400 absolute left-3" size={18} />
              <select
                name="device"
                className="w-full appearance-none pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition duration-200 shadow-sm"
              >
                <option value="hp">HP (Admin DKM)</option>
                <option value="tv">TV (Display)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium text-sm shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              <FiSmartphone size={18} />
              Login
            </button>

            <div className="mt-3 text-center text-xs text-gray-500">
              Dengan masuk, Anda menyetujui kebijakan dan penggunaan layanan.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
