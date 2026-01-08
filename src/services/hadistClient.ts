import api from "../api/axios";

export type Hadist = {
  id: number;
  konten: string;
  riwayat: string;
  kitab: string;
  disabled: boolean;
};

export async function getHadists(): Promise<Hadist[]> {
  const res = await api.get("/tenant/hadists");
  return res.data;
}

export async function toggleHadist(
  id: number,
  disabled: boolean
) {
  const res = await api.put(`/tenant/hadists/${id}`, { disabled });
  return res.data;
}
