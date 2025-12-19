import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Daftar Akun Masjid</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Nama Masjid</th>
            <th>Lokasi</th>
            <th>Tanggal Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4}>Belum ada data</td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>
                {new Date(item.created_at).toLocaleDateString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
