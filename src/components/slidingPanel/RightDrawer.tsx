import { Link } from "react-router-dom";

export default function RightDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-black/70 backdrop-blur-lg 
      border-l border-yellow-400/40 p-5 transition-transform duration-500 z-50
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Tombol Close */}
      <button
        className="text-white text-xl mb-5"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Tombol Admin Panel */}
      <Link
        to="/admin"
        className="block bg-yellow-400 hover:bg-yellow-300 text-black text-center py-2 rounded-lg font-bold shadow"
      >
        Admin Panel
      </Link>
    </div>
  );
}
