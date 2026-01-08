import api from "../api/axios";

// TYPE
export type Client = {
  id: string;
  name: string | null;
  location: string | null;
  timezone: string | null;

  config_title: string | null;
  config_background: string | null;
  // config_sound_alert: string | null;
  logo: string | null;

  running_text: string | null;

  // enable_hadis: boolean;
  // enable_hari_besar: boolean;
  // enable_kalender: boolean;

  created_at: string;

  // ✅ dari backend
  logo_url?: string;
  background_url?: string;
  // sound_url?: string;
};

// API FUNCTIONS
export async function getClient(): Promise<Client> {
  const res = await api.get("/tenant/client");
  return res.data;
}

export type UpdateClientPayload = {
  name?: string;
  location?: string;
  logo?: File | null;
  running_text?: string;
  config_background?: File | null;
  config_sound_alert?: File | null;
};

export async function updateClient(
  data: UpdateClientPayload
) {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.location) formData.append("location", data.location);
  if (data.logo) formData.append("logo", data.logo);
  if (data.running_text) formData.append("running_text", data.running_text);
  if (data.config_background)
    formData.append("config_background", data.config_background);
  if (data.config_sound_alert)
    formData.append("config_sound_alert", data.config_sound_alert);

  const res = await api.put("/tenant/client", formData);
  return res.data;
}
