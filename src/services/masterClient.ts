const API_URL = import.meta.env.VITE_API_URL;

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

export type UpdateClientPayload = {
  name?: string;
  location?: string;
  logo?: File | null;
  running_text?: string;
  config_background?: File | null;
};

export async function updateClient(
  data: UpdateClientPayload,
  token: string
) {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.location) formData.append("location", data.location);
  if (data.logo) formData.append("logo", data.logo);
  if (data.running_text) formData.append("running_text", data.running_text);
  if (data.config_background)
    formData.append("config_background", data.config_background);

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
