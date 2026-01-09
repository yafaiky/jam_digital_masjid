export default function KomatPage() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-400 to-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-6">
        {/* Main heading with gradient text */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
            WAKTU KOMAT
          </h1>
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"></div>
        </div>
        
        {/* Info section */}
        <div className="mt-12 pt-8 border-t border-orange-500/30">
          <p className="text-lg md:text-xl text-orange-200 font-light tracking-wide">
            Persiapkan diri untuk beribadah
          </p>
          <p className="text-sm text-gray-400 mt-3 uppercase tracking-widest">
            Ikuti waktu sholat dengan baik dan tertib
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center gap-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}
