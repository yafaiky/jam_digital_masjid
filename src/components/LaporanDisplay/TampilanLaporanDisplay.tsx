import React, { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  EyeOff,
} from "lucide-react";
import { useFinanceTransactions } from "../../hooks/useFinanceTransactions";
import { useFinanceBalance } from "../../hooks/useFinanceBalance";

interface Transaction {
  id: number;
  client_id?: string;
  type: "Penerimaan" | "Pengeluaran";
  description: string;
  amount: number;
}

const TampilanLaporanDisplay: React.FC = () => {
  const [name, setName] = useState("Masjid Al-Ikhlas");
  const [date, setDate] = useState("2023-10-01");
  const [showAmount, setShowAmount] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Extract month from date for API call
  const selectedMonth = date.substring(0, 7); // YYYY-MM format

  const {
    transactions: apiTransactions,
    loading,
    error,
    fetchTransactions,
  } = useFinanceTransactions(selectedMonth);

  const { balance, getRealtimeBalance } = useFinanceBalance();

  // Map API data to component's Transaction interface
  const transactions: Transaction[] = apiTransactions.map((tx) => ({
    id: tx.id,
    type: tx.type === "pemasukan" ? "Penerimaan" : "Pengeluaran",
    description: tx.description || "Tidak ada deskripsi",
    amount: tx.amount,
  }));

  // Fetch balance data when month changes
  useEffect(() => {
    getRealtimeBalance(selectedMonth);
  }, [selectedMonth, getRealtimeBalance]);

  // Auto-refresh data 15 seconds to sync with admin panel changes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions(selectedMonth);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [selectedMonth, fetchTransactions]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId: number;
    let virtualScroll = 0;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const scrollSpeedDown = 0.2;
    const scrollSpeedUp = 0.2;
    const pauseDuration = 1000;

    let mode: "down" | "up" | "pause" = "down";

    const animate = () => {
      if (!container) return;

      if (mode === "down") {
        virtualScroll += scrollSpeedDown;
        container.scrollTop = virtualScroll;

        if (virtualScroll + container.clientHeight >= container.scrollHeight) {
          mode = "pause";
          pauseTimeout = setTimeout(() => {
            mode = "up";
          }, pauseDuration);
        }
      } else if (mode === "up") {
        virtualScroll -= scrollSpeedUp;

        if (virtualScroll <= 0) {
          virtualScroll = 0;
          container.scrollTop = 0;
          mode = "pause";

          pauseTimeout = setTimeout(() => {
            mode = "down";
          }, pauseDuration);
        } else {
          container.scrollTop = virtualScroll;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    if (container.scrollHeight > container.clientHeight) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [transactions]);

  const totalPenerimaan = transactions
    .filter((t) => t.type === "Penerimaan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.type === "Pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const saldoAkhir = totalPenerimaan - totalPengeluaran;

  const formatAmount = (amount: number) => {
    return showAmount ? amount.toLocaleString("id-ID") : "••••••";
  };

  {
    loading && (
      <tr>
        <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
          Menyinkronkan data keuangan…
        </td>
      </tr>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Laporan Keuangan
            </h1>
            <button
              onClick={() => setShowAmount(!showAmount)}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-white"
            >
              {showAmount ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="group">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Nama Organisasi
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-400 transition-all"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Tanggal Laporan
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-sm font-medium">
                Saldo Akhir
              </span>
              <DollarSign className="text-blue-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">
              Rp {formatAmount(saldoAkhir)}
            </p>
            <p className="text-xs text-slate-400 mt-2">Saldo bulan ini</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-emerald-300 text-sm font-medium">
                Penerimaan
              </span>
              <TrendingUp className="text-emerald-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-emerald-300">
              Rp {formatAmount(totalPenerimaan)}
            </p>
            <p className="text-xs text-emerald-300/70 mt-2">Total masuk</p>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg p-6 hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-red-300 text-sm font-medium">
                Pengeluaran
              </span>
              <TrendingDown className="text-red-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-300">
              Rp {formatAmount(totalPengeluaran)}
            </p>
            <p className="text-xs text-red-300/70 mt-2">Total keluar</p>
          </div>

          <div className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border border-violet-500/30 rounded-lg p-6 hover:border-violet-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-violet-300 text-sm font-medium">
                Total Transaksi
              </span>
              <DollarSign className="text-violet-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-violet-300">
              Rp {formatAmount(totalPenerimaan + totalPengeluaran)}
            </p>
            <p className="text-xs text-violet-300/70 mt-2">Jumlah semua</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
          <div
            ref={scrollRef}
            className="max-h-[450px] overflow-y-auto no-scrollbar scroll-smooth"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Jenis Transaksi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Nominal (Rp)
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-slate-700/50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.type === "Penerimaan"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {transaction.type === "Penerimaan" ? (
                          <TrendingUp size={14} className="mr-1" />
                        ) : (
                          <TrendingDown size={14} className="mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 group-hover:text-white transition-colors">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-white font-mono">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-2 h-2 rounded-full mx-auto bg-emerald-400"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>Total transaksi: {transactions.length}</p>
          <p>
            Laporan diperbarui: {new Date(date).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TampilanLaporanDisplay;
