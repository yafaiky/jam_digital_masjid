// components/Step1CreateClient.tsx
import React from "react";
import { useCreateClient } from "../../../hooks/useCreateClient";
import {
  FaMosque,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

type Step1CreateClientProps = {
  onSuccess: (clientId: string) => void;
};

const Step1CreateClient: React.FC<Step1CreateClientProps> = ({ onSuccess }) => {
  const { form, loading, error, handleChange, submit } =
    useCreateClient(onSuccess);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <div>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg">
                  <FaMosque className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Buat Master Client
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Konfigurasi awal masjid Anda
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
              {/* Nama Masjid */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaMosque className="w-4 h-4 text-blue-600" />
                  Nama Masjid
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaMosque className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masjid At-Tohir"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400
                               focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100
                               hover:border-gray-300 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Lokasi */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-cyan-500" />
                  Lokasi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Jakarta Selatan"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400
                               focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100
                               hover:border-gray-300 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Running Text */}
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaAlignLeft className="w-4 h-4 text-blue-500" />
                  Running Text
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FaAlignLeft className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                  </div>
                  <textarea
                    name="running_text"
                    value={form.running_text}
                    onChange={handleChange}
                    placeholder="Selamat datang di Masjid kami. Mari kita jaga kebersihan dan kekhusyukan..."
                    rows={4}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 pl-12 text-sm font-medium text-gray-800 placeholder:text-gray-400
                               focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
                               hover:border-gray-300 transition-all duration-300 resize-none"
                  />
                </div>
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
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
                <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-sm"></div>
                <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
                <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-gray-500">
              Langkah 1 dari 3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1CreateClient;
