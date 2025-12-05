import { useNavigate } from "react-router-dom";

export default function RightDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const goToAdmin = () => {
    // animasi klik
    const btn = document.getElementById("admin-btn");
    if (btn) {
      btn.classList.add("scale-95");
      setTimeout(() => {
        btn.classList.remove("scale-95");
        navigate("/admin"); // berpindah halaman
      }, 120);
    }
  };

  return (
    <div
      className={`
      fixed top-0 right-0 h-full w-64 
      bg-black/60 backdrop-blur-xl
      border-l border-yellow-400/40 
      p-5 shadow-2xl shadow-black/50

      transition-all duration-500 z-50

      ${open 
        ? "translate-x-0 opacity-100" 
        : "translate-x-full opacity-0"
      }
    `}
    >
      {/* Tombol Close */}
      <button
        className="
          text-white text-2xl mb-5
          hover:scale-110 transition-transform duration-200
        "
        onClick={onClose}
      >
        ✕
      </button>

      {/* Tombol Admin Panel */}
      <button
        id="admin-btn"
        onClick={goToAdmin}
        className="
          w-full py-2 rounded-lg font-bold text-black
          bg-yellow-400
          hover:bg-yellow-300
          shadow-lg shadow-yellow-500/30
          hover:shadow-yellow-300/50
          transition-all duration-200 
          active:scale-95
        "
      >
        DKM Admin Panel
      </button>
    </div>
  );
}
