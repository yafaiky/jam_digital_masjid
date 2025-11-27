import HeaderTop from "../components/header/HeaderTop";
import ClockBox from "../components/center/ClockBox";
import CountdownBox from "../components/center/CountdownBox";
import HadisBox from "../components/center/HadisBox";
import PrayerSchedule from "../components/jadwal/jadwalSolat";
import RunningTxt from "../components/footer/RunningText";
import HariBesar from "../components/header/HariBesar";
import BackgroundLayer from "../components/background/BackgroundLayer";


export default function DashboardDefault() {
  return (
    <div className="w-full min-h-screen flex flex-col relative">


      {/* Background + overlay */}
      <BackgroundLayer />

      {/* Header */}
      <HeaderTop />

      {/* Hari Besar (di luar header) */}
      <div className="mr-18"> 
        <HariBesar />

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 mt-10 flex justify-center gap-30">
        {/* KIRI */}
        <div className="flex flex-col items-center mr-50">
          <ClockBox />

          <div className="mt-4 w-full flex justify-center">
            <CountdownBox />
          </div>
        </div>

        {/* KANAN */}
        <div className="max-w-md">
          <HadisBox />
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="w-full">
        <div className="m-0 p-0">
          <PrayerSchedule />
        </div>

        <div className="m-0 p-0">
          <RunningTxt running_text="selamat datang di masjid jpn dimana anda akan bertobat dan bertobat dikarenakan dosa anda yang sudah begitu banyak, sekian dan terima gaji." />
        </div>
      </div>
    </div>
  );
}
