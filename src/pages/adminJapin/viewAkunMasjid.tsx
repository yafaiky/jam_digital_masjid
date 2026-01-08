import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  FaMosque,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

export type AkunMasjid = {
  id: string;
  name: string;
  location: string;
  created_at: string;
  DkmUser?: {
    id: string;
    username: string;
  };
};

export default function ViewAkunMasjid() {
  const [data, setData] = useState<AkunMasjid[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/client");
      setData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                Total {data.length} masjid terdaftar
              </p>
            </div>
          </div>
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
              <FaMosque className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium text-lg">
                Belum ada masjid terdaftar
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Mulai dengan membuat akun masjid baru
              </p>
            </div>
          </div>
        ) : (
          
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
                  {item.DkmUser && (
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
                  )}

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
        )}
      </div>
    </div>
  );
}
