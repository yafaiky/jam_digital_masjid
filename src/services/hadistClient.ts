const API_URL = import.meta.env.VITE_API_URL;

export type Hadist = {
  id: number;
  konten: string;
  riwayat: string;
  kitab: string;
  disabled: boolean;
};

export async function getHadists(token: string): Promise<Hadist[]> {
  const res = await fetch(`${API_URL}/tenant/hadists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal ambil hadist");
  return res.json();
}

export async function toggleHadist(
  id: number,
  disabled: boolean,
  token: string
) {
  const res = await fetch(`${API_URL}/tenant/hadists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ disabled }),
  });

  if (!res.ok) throw new Error("Gagal update hadist");
  return res.json();
}
