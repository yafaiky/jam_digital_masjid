import moment from "moment-hijri";

export function getHijriyahDate() {
  const today = moment();

  const day = today.iDate();       // tanggal hijriyah
  const month = today.iMonth();    // index bulan 0–11
  const year = today.iYear();      // tahun hijriyah

  const bulan = [
    "Muharram",
    "Safar",
    "Rabi'ul Awal",
    "Rabi'ul Akhir",
    "Jumadil Awal",
    "Jumadil Akhir",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawal",
    "Zulqaidah",
    "Zulhijjah",
  ];

  return `${day} ${bulan[month]} ${year}H`;
}
