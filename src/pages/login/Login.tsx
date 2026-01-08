import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { FiUser, FiLock, FiTv, FiSmartphone } from "react-icons/fi";
import { FaMosque } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;
    const device = e.target.device.value;

    try {
      const res = await api.post("/login", {
        username,
        password,
        device,
      });

      login(res.data.token, res.data.role);
      navigate(`/${res.data.role}`);

    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Username atau password salah";

      setError(message);
      setShake(true);
      setTimeout(() => setShake(false), 400);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div
        className={`w-full max-w-md transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`
            rounded-2xl bg-white/80 backdrop-blur-md shadow-xl
            ring-1 ring-orange-100 overflow-hidden
            transform transition duration-300 hover:scale-[1.01]
            ${shake ? "animate-shake" : ""}
          `}
        >
          {/* HEADER */}
          <div className="px-8 py-6 sm:px-10 sm:py-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-400 flex items-center justify-center text-white shadow-md">
              <FaMosque size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Selamat Datang
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Pada Jam Digital Masjid JAPIN
              </p>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="px-8 pb-8 sm:px-10 sm:pb-10 flex flex-col gap-4"
          >
            {/* ERROR ALERT */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* USERNAME */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="username"
                required
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>

            {/* DEVICE */}
            <div className="relative">
              <FiTv className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="device"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="hp">HP (Admin DKM)</option>
                <option value="tv">TV (Display)</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 w-full inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-xl text-white text-sm font-medium
                bg-gradient-to-r from-yellow-400 to-orange-400
                shadow-lg transition-all duration-200
                hover:scale-[1.03] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Memproses..." : <><FiSmartphone /> Login</>}
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
