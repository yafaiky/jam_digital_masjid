export default function HadisBox() {
  return (
    <div
      className="
      relative
      bg-gradient-to-br from-white/20 to-white/5
      p-6 rounded-3xl shadow-xl
      border border-white/40
      backdrop-blur-md
      text-white
    "
    >
      {/* Ornamen decorative line */}
      <div className="absolute top-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

      {/* Isi Hadis */}
      <p className="text-xl font-semibold leading-relaxed drop-shadow">
        “Ketahuilah bahwasannya kemenangan itu bersama kesabaran, dan jalan
        keluar itu bersama kesulitan. Dan sesungguhnya bersama kesulitan ada
        kemudahan.”
      </p>

      <p className="mt-4 text-right text-lg font-semibold text-yellow-300 drop-shadow">
        ( HR. Tirmidzi )
      </p>

      {/* Ornamen bottom */}
      <div className="absolute bottom-3 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>
  );
}
