// components/Step1CreateClient.tsx
import React from "react";
import { useCreateClient } from "../../../hooks/useCreateClient";

type Step1CreateClientProps = {
  onSuccess: (clientId: string) => void;
};

const Step1CreateClient: React.FC<Step1CreateClientProps> = ({ onSuccess }) => {
  const { form, loading, error, handleChange, submit } =
    useCreateClient(onSuccess);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
            🕌
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            Buat Master Client
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Konfigurasi awal masjid
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Nama Masjid */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nama Masjid
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                🏛️
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masjid At-Tohir"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm
                           focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Lokasi
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                📍
              </span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Jakarta"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm
                           focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Running Text */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Running Text
            </label>
            <textarea
              name="running_text"
              value={form.running_text}
              onChange={handleChange}
              placeholder="Selamat datang di Masjid..."
              rows={3}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action */}
        <button
          onClick={submit}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white
                     hover:bg-blue-700 transition-all
                     disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan & Lanjut →"}
        </button>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Langkah 1 dari 3
        </p>
      </div>
    // </div>
  );
};

export default Step1CreateClient;
