// components/Step2CreateDkm.tsx
import React from "react";
import { useCreateDkm } from "../../../hooks/useCreateDKM";
import { FaUser, FaLock, FaCheckCircle, FaArrowRight } from "react-icons/fa";

type Step2CreateDkmProps = {
  clientId: string;
  onSuccess: () => void;
};

const Step2CreateDkm: React.FC<Step2CreateDkmProps> = ({
  clientId,
  onSuccess,
}) => {
  const { form, loading, error, handleChange, submit } =
    useCreateDkm(clientId, onSuccess);

   return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <div >
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg">
                  <FaUser className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Buat Akun DKM
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Pengurus masjid akan menggunakan akun ini
                  </p>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 flex items-start gap-3 shadow-sm">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs">⚠️</span>
                </div>
                <span className="flex-1">{error}</span>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* Username */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaUser className="w-4 h-4 text-blue-600" />
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaUser className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="Username"
                    value={form.Username}
                    onChange={handleChange}
                    placeholder="Majid Nurul Mustofa"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400
                               focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100
                               hover:border-gray-300 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaLock className="w-4 h-4 text-cyan-500" />
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400
                               focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100
                               hover:border-gray-300 transition-all duration-300"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                  <FaLock className="w-3 h-3" />
                  Password harus minimal 6 karakter
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <button
                onClick={submit}
                disabled={loading}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 py-4 text-base font-semibold text-white shadow-md
                           hover:scale-[1.02] active:scale-95 
                           disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
                           transition-all duration-300"
              >
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan Data...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="w-5 h-5" />
                      Simpan & Lanjutkan
                      <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
                <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-sm"></div>
                <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-gray-500">
              Langkah 2 dari 3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2CreateDkm;
