const API_URL = "http://localhost:8080";

export async function getClient(token: string) {
  const res = await fetch(`${API_URL}/tenant/client`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil data");

  return res.json();
}

export async function updateClient(data: {
  name?: string;
  location?: string;
  logo?: File | null;
}, token: string) {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.location) formData.append("location", data.location);
  if (data.logo) formData.append("logo", data.logo);

  const res = await fetch(`${API_URL}/tenant/client`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal update data");

  return res.json();
}
