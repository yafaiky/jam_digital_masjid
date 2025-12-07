
import HeaderTop from "../../components/header/HeaderTop";
import ClockBox from "../../components/center/ClockBox";
import CountdownBox from "../../components/center/CountdownBox";
import HadisBox from "../../components/center/HadisBox";
import PrayerSchedule from "../../components/jadwal/jadwalSolat";
import RunningTxt from "../../components/footer/RunningText";
import HariBesar from "../../components/header/HariBesar";
import BackgroundLayer from "../../components/background/BackgroundLayer";

// Gesture & Drawer
// import MouseGesture from "../../components/slidingPanel/MouseGesture";
// import RightDrawer from "../../components/slidingPanel/RightDrawer";

export default function DashboardDefault() {
  // const [drawerOpen, setDrawerOpen] = useState(false);

  return (  
    <div className="w-full min-h-screen flex flex-col relative">

      {/* Background */}
      <BackgroundLayer />

      {/* <MouseGesture onSwipeRight={() => setDrawerOpen(true)} />

      <RightDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} /> */}

      {/* Header */}
      <HeaderTop />

      {/* Hari Besar */}
      <div className="mr-18">
        <HariBesar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 mt-10 flex justify-center gap-30">
        {/* Left */}
        <div className="flex flex-col items-center mr-50">
          <ClockBox />
          <div className="mt-4 w-full flex justify-center">
            <CountdownBox />
          </div>
        </div>

        {/* Right */}
        <div className="max-w-md">
          <HadisBox />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <PrayerSchedule />
        <RunningTxt />
      </div>

    </div>
  );
}
