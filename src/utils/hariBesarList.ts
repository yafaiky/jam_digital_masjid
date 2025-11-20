// utils/hariBesarList.ts

export type HariBesar = {
  name: string;
  date: string; // format YYYY-MM-DD
};

// Daftar hari besar 2025
export const hariBesarList: HariBesar[] = [
  { name: "Isra’ Mi’raj", date: "2025-01-26" },
  { name: "Awal Ramadan", date: "2025-03-01" },
  { name: "Nuzulul Qur’an", date: "2025-03-17" },
  { name: "Idul Fitri", date: "2025-03-31" },
  { name: "Idul Adha", date: "2025-06-06" },
  { name: "Tahun Baru Islam", date: "2025-06-27" },
];

// Hitung event yang paling dekat
export function getCountdown(dateString: string): number {
  const today = new Date();
  const target = new Date(dateString);

  const diffMs = target.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return daysLeft;
}
