import { useMasjidList } from "../../hooks/useMasjidList";
import {
  FaMosque,
  FaMapMarkerAlt,
  FaCalendarAlt,
  // FaUser,
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ViewAkunMasjid() {
  const {
    data,
    loading,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b rounded-2xl border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-md">
              <FaMosque className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Daftar Akun Masjid
              </h1>
              <p className="text-sm text-gray-600">
                Total {totalItems} masjid terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-8 ml-13 flex">
        <div className="relative w-full max-w-lg">
          {/* Search Icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Cari nama masjid atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="
        w-full rounded-xl border border-gray-300
        bg-white py-3 pl-11 pr-12 text-sm
        shadow-sm transition-all duration-200
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100
        hover:border-gray-400
        outline-none
      "
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={() => setSearch("")}
              className="
          absolute inset-y-0 right-0 flex items-center pr-4
          text-gray-400 hover:text-gray-600 transition
        "
            >
              <FaTimes className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600 font-medium">Memuat data...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <img src="/icon.png" alt="icon" className="mx-auto h-16 w-16 mb-4 grayscale" />
              <p className="text-gray-500 font-medium text-lg">
                Belum ada masjid terdaftar
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Mulai dengan membuat akun masjid baru
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full"
                >
                  <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400">
                        <FaMosque className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {item.name}
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
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* DKM User */}
                    {/* {item.DkmUser && (
                      <div className="flex items-start gap-3">
                        <FaUser className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            Pengurus
                          </p>
                          <p className="text-sm text-gray-800 font-medium mt-0.5">
                            {item.DkmUser.username}
                          </p>
                        </div>
                      </div>
                    )} */}

                    {/* Tanggal */}
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Dibuat pada
                        </p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                    <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95">
                      Kelola
                    </button>
                  </div> */}
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
                      )
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
    </div>
  );
}