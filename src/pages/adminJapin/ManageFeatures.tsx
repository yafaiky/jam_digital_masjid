import { useState, useEffect } from "react";
import {
  FaMosque,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
  FaSpinner,
  FaCalendarAlt,
} from "react-icons/fa";
import { useMasjidList, type AkunMasjid } from "../../hooks/useMasjidList";
import { featuresApi, type TenantFeature } from "../../services/financeClient";

// Available features that can be toggled
const AVAILABLE_FEATURES = [
  {
    key: "finance",
    label: "Laporan Keuangan",
    description: "Fitur manajemen laporan keuangan Masjid",
  },
  {
    key: "banner",
    label: "Banner",
    description: "Pengelolaan banner tampilan",
  },
  { key: "hadist", label: "Hadist", description: "Pengelolaan konten hadist" },
  {
    key: "jadwal",
    label: "Jadwal Sholat",
    description: "Pengelolaan jadwal salat",
  },
];

export default function ManageFeatures() {
  const {
    data: clients,
    loading: loadingClients,
    currentPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    searchQuery,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
    setSearch,
  } = useMasjidList();

  // State for managing features per client
  const [clientFeatures, setClientFeatures] = useState<
    Record<string, TenantFeature[]>
  >({});
  const [loadingFeatures, setLoadingFeatures] = useState<
    Record<string, boolean>
  >({});
  const [selectedClient, setSelectedClient] = useState<AkunMasjid | null>(null);
  const [togglingFeature, setTogglingFeature] = useState<string | null>(null);

  // Fetch features when a client is selected
  useEffect(() => {
    if (selectedClient) {
      fetchClientFeatures(selectedClient.id);
    }
  }, [selectedClient]);

  const fetchClientFeatures = async (clientId: string) => {
    setLoadingFeatures((prev) => ({ ...prev, [clientId]: true }));
    try {
      const response = await featuresApi.getAll(clientId);
      setClientFeatures((prev) => ({
        ...prev,
        [clientId]: response.data,
      }));
    } catch (err) {
      console.error("Failed to fetch features:", err);
      // Initialize with default features if none exist
      setClientFeatures((prev) => ({
        ...prev,
        [clientId]: [],
      }));
    } finally {
      setLoadingFeatures((prev) => ({ ...prev, [clientId]: false }));
    }
  };

  const handleToggleFeature = async (
    clientId: string,
    featureKey: string,
    currentEnabled: boolean,
  ) => {
    setTogglingFeature(`${clientId}-${featureKey}`);
    try {
      await featuresApi.toggle(clientId, featureKey, !currentEnabled);
      // Refresh features
      await fetchClientFeatures(clientId);
    } catch (err) {
      console.error("Failed to toggle feature:", err);
      alert("Gagal mengubah status fitur");
    } finally {
      setTogglingFeature(null);
    }
  };

  const isFeatureEnabled = (clientId: string, featureKey: string): boolean => {
    const features = clientFeatures[clientId] || [];
    const feature = features.find((f) => f.feature_key === featureKey);
    return feature?.enabled ?? false;
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b rounded-2xl border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-md">
              <FaShieldAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Kelola Fitur Masjid
              </h1>
              <p className="text-sm text-gray-600">
                Aktifkan atau nonaktifkan fitur untuk setiap Masjid
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-8 ml-13 flex">
        <div className="relative w-full max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama Masjid..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 text-sm shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-400 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {loadingClients ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600 font-medium">Memuat data...</p>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <img
                src="/icon.png"
                alt="icon"
                className="mx-auto h-16 w-16 mb-4 grayscale"
              />
              <p className="text-gray-500 font-medium text-lg">
                Belum ada Masjid terdaftar
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400">
                        <FaMosque className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {client.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Lokasi */}
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Lokasi
                        </p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">
                          {client.location}
                        </p>
                      </div>
                    </div>

                    {/* Tanggal */}
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Dibuat pada
                        </p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">
                          {new Date(client.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Quick feature status */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                        Status Fitur
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_FEATURES.slice(0, 3).map((feat) => (
                          <span
                            key={feat.key}
                            className={`px-2 py-1 text-xs rounded-full ${
                              isFeatureEnabled(client.id, feat.key)
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isFeatureEnabled(client.id, feat.key) ? "✓" : "✗"}{" "}
                            {feat.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 rounded-b-xl">
                    <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95">
                      Kelola Fitur
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600 font-medium">
                  Menampilkan {startIndex}-{endIndex} dari {totalItems}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            page === currentPage
                              ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Berikutnya
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for managing features */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400">
                  <FaMosque className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedClient.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedClient.location}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {loadingFeatures[selectedClient.id] ? (
                <div className="flex items-center justify-center py-8">
                  <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Aktifkan atau nonaktifkan fitur untuk Masjid ini:
                  </p>
                  {AVAILABLE_FEATURES.map((feature) => {
                    const enabled = isFeatureEnabled(
                      selectedClient.id,
                      feature.key,
                    );
                    const isToggling =
                      togglingFeature === `${selectedClient.id}-${feature.key}`;

                    return (
                      <div
                        key={feature.key}
                        className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-300 ${
                          enabled
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex-1">
                          <h3
                            className={`font-semibold ${enabled ? "text-green-800" : "text-gray-800"}`}
                          >
                            {feature.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleToggleFeature(
                              selectedClient.id,
                              feature.key,
                              enabled,
                            )
                          }
                          disabled={isToggling}
                          className={`ml-4 flex items-center justify-center rounded-full transition-all duration-300 ${
                            enabled ? "text-green-600" : "text-gray-400"
                          } ${!isToggling ? "hover:scale-110" : ""}`}
                        >
                          {isToggling ? (
                            <FaSpinner className="h-6 w-6 animate-spin" />
                          ) : enabled ? (
                            <FaToggleOn className="h-8 w-8" />
                          ) : (
                            <FaToggleOff className="h-8 w-8" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                onClick={handleCloseModal}
                className="rounded-xl bg-gray-100 px-6 py-2 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
