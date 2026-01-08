// components/Step3UploadBanners.tsx
import React from "react";
import { useUploadBanners } from "../../../hooks/useUploadBanners";
import { FaImage, FaCheckCircle, FaArrowRight, FaTimes } from "react-icons/fa";

type Step3UploadBannersProps = {
  clientId: string;
  onFinish?: () => void;
};

const Step3UploadBanners: React.FC<Step3UploadBannersProps> = ({
  clientId,
  onFinish,
}) => {
  const {
    files,
    loading,
    error,
    maxBanner,
    handleUpload,
    removeFile,
    submit,
  } = useUploadBanners(clientId, onFinish);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <div>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg">
                  <FaImage className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Upload Banner
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Wajib upload tepat {maxBanner} banner untuk tampilan masjid
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

            {/* Upload Input */}
            <div className="mb-8">
              <label className="mb-4 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaImage className="w-4 h-4 text-blue-600" />
                Pilih File Banner
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  disabled={files.length >= maxBanner}
                  className="hidden"
                  id="banner-input"
                />
                <label
                  htmlFor="banner-input"
                  className={`block w-full rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-all duration-300
                    ${
                      files.length >= maxBanner
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : "border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"
                    }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <FaImage className="w-8 h-8 text-blue-600" />
                    <div className="text-sm font-semibold text-gray-800">
                      Klik untuk memilih gambar
                    </div>
                    <div className="text-xs text-gray-600">
                      atau drag & drop gambar di sini
                    </div>
                    <div className="mt-2 text-xs font-medium text-gray-500">
                      {files.length} dari {maxBanner} banner dipilih
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Preview Grid */}
            {files.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                  Preview Banner
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-100 hover:border-blue-400 transition-all duration-300"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 shadow-md"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-white font-medium truncate">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-8">
              <button
                onClick={submit}
                disabled={loading || files.length !== maxBanner}
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
                      Mengunggah Banner...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="w-5 h-5" />
                      Selesai Buat Setup
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
                <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
                <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-sm"></div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-gray-500">
              Langkah 3 dari 3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3UploadBanners;
