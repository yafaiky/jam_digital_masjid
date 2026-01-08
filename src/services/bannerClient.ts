import api from "../api/axios";

export type Banner = {
  id: number;
  client_id: string;
  path: string;
  created_at: string;
  url: string;
};

export async function getBanners(): Promise<Banner[]> {
  const res = await api.get("/tenant/banners");
  return res.data;
}

export async function updateBanner(
  bannerId: number,
  file: File
) {
  const formData = new FormData();
  formData.append("banner", file);

  const res = await api.put(`/tenant/banners/${bannerId}`, formData);
  return res.data;
}
