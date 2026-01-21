import React, { useState, useEffect } from "react";
import { FaChartBar, FaCalendarAlt } from "react-icons/fa";
import { useFinanceBalance } from "../../../../hooks/useFinanceBalance";

const LaporanIndex: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const { balance, loading, error, getRealtimeBalance } = useFinanceBalance();

  useEffect(() => {
    getRealtimeBalance(selectedMonth);
  }, [selectedMonth, getRealtimeBalance]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 ml-4 mr-4 mb-4 mt-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-400 shadow-md">
          <FaChartBar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h2>
          <p className="text-gray-600">Lihat laporan dan saldo real-time</p>
        </div>
      </div>

      {/* Month Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="w-5 h-5 text-gray-400" />
          <label
            htmlFor="month-select"
            className="text-sm font-medium text-gray-700"
          >
            Pilih Bulan:
          </label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Balance Summary */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Memuat data...</span>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8">
          <div className="text-center text-red-600">
            <p>Terjadi kesalahan: {error}</p>
          </div>
        </div>
      ) : balance ? (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Total Pemasukan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(balance.total_income)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          {/* Total Pengeluaran */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(balance.total_expense)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-pink-100">
                <span className="text-2xl">📉</span>
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo</p>
                <p
                  className={`text-2xl font-bold ${balance.balance >= 0 ? "text-blue-600" : "text-red-600"}`}
                >
                  {formatCurrency(balance.balance)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center text-gray-500">
            <p>Tidak ada data untuk bulan yang dipilih</p>
          </div>
        </div>
      )}

      {/* Detailed Breakdown */}
      {balance && balance.details && balance.details.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rincian per Kartu
          </h3>
          <div className="space-y-4">
            {balance.details.map((detail: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {detail.card_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Pemasukan: {formatCurrency(detail.income)} | Pengeluaran:{" "}
                    {formatCurrency(detail.expense)}
                  </p>
                </div>
                <div
                  className={`font-semibold ${detail.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(detail.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanIndex;
