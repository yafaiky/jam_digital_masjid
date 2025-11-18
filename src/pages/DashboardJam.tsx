import HeaderTop from "../components/header/HeaderTop";
import ClockBox from "../components/center/ClockBox";
import CountdownBox from "../components/center/CountdownBox";
import HadisBox from "../components/center/HadisBox";
import PrayerSchedule from "../components/jadwal/jadwalSolat";

export default function DashboardJam() {
  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="h-16 w-full">
        <HeaderTop />
      </div>

      <div className="mt-35 flex justify-center gap-30">
        {/* KIRI: Clock + Countdown */}
        <div className="flex flex-col items-center mr-50">
          <ClockBox />

          <div className="mt-4 w-full flex justify-center">
            <CountdownBox />
          </div>
        </div>

        {/* KANAN: Hadist */}
        <div className="max-w-md">
          <HadisBox />
        </div>

        <div className="absolute bottom-20 w-full">
          <PrayerSchedule />
        </div>
      </div>
    </div>
  );
}
