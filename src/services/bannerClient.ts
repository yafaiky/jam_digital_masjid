const API_URL = import.meta.env.VITE_API_URL;

export type Banner = {
  id: number;
  client_id: string;
  path: string;
  created_at: string;
  url: string;
};

export async function getBanners(token: string): Promise<Banner[]> {
  const res = await fetch(`${API_URL}/tenant/banners`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil banner");
  return res.json();
}

export async function updateBanner(
  bannerId: number,
  file: File,
  token: string
) {
  const formData = new FormData();
  formData.append("banner", file);

  const res = await fetch(`${API_URL}/tenant/banners/${bannerId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal update banner");
  return res.json();
}
