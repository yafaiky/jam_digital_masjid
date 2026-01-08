import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { FiUser, FiLock, FiMonitor } from "react-icons/fi";
import { useState } from "react";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/login/admin", {
        username,
        password,
      });

      login(res.data.token, res.data.role);
      navigate(`/${res.data.role}`);

    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Username atau password admin japin salah";

      setError(message);
      setShake(true);
      setTimeout(() => setShake(false), 400);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
      <div className="w-full max-w-md animate-fadeIn">
        <div
          className={`
            rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl
            ring-1 ring-blue-100 overflow-hidden
            transform transition duration-300 hover:scale-[1.02]
            ${shake ? "animate-shake" : ""}
          `}
        >
          {/* HEADER */}
          <div className="px-8 py-6 sm:px-10 sm:py-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-white to-cyan-400 border-2 border-blue-900 border-dashed flex items-center justify-center shadow-lg">
              <img src="/icon.png" alt="Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
                Super Admin Login
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Akses Provider & Sistem
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
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                name="username"
                required
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-3 w-full inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-xl text-white text-sm font-medium
                bg-gradient-to-r from-blue-600 to-cyan-400
                shadow-lg transition-all duration-200
                hover:scale-[1.04] active:scale-[0.97]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Memproses..." : <><FiMonitor /> Masuk Super Admin</>}
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              Panel khusus Provider & Sistem
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
