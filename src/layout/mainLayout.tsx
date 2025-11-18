import BackgroundLayer from "../components/background/BackgroundLayer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden relative">

      {/* Background + overlay */}
      <BackgroundLayer />

      {/* Konten aplikasi */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
