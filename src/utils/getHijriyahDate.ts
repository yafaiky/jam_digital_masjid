import moment from "moment-hijri";

export function getHijriyahDate() {
  const today = moment();

  const day = today.iDate();
  const month = today.iMonth();
  const year = today.iYear();

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
