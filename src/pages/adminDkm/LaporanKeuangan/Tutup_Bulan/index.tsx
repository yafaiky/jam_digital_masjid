import dayjs from "dayjs";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  DatePicker,
  Button,
  message,
  Modal,
  Card,
  Statistic,
  Row,
  Col,
} from "antd";
import { useFinanceBalance } from "../../../../hooks/useFinanceBalance";
import { useFinanceTransactions } from "../../../../hooks/useFinanceTransactions";

const { MonthPicker } = DatePicker;
const { confirm } = Modal;

const TutupBulanIndex: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("YYYY-MM"), // YYYY-MM format
  );
  const [loading, setLoading] = useState(false);

  const { balance, loading: balanceLoading } = useFinanceBalance();
  const { transactions } = useFinanceTransactions(selectedMonth);

  const handleMonthChange = (
    date: dayjs.Dayjs | null,
    dateString: string | null,
) => {
    setSelectedMonth(dateString || dayjs().format("YYYY-MM"));
  };

  const handleCloseMonth = () => {
    confirm({
      title: "Konfirmasi Tutup Bulan",
      content: `Apakah Anda yakin ingin menutup bulan ${selectedMonth}? Tindakan ini tidak dapat dibatalkan.`,
      okText: "Ya, Tutup Bulan",
      cancelText: "Batal",
      onOk: async () => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));
          message.success(`Bulan ${selectedMonth} berhasil ditutup`);
        } catch (error) {
          message.error("Gagal menutup bulan");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpense;

  return (
    <div className="space-y-6 ml-4 mr-4 mb-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Tutup Bulan Keuangan
        </h2>

      </div>

      {/* Month Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Pilih Bulan yang akan ditutup:
          </label>
          <MonthPicker
            value={selectedMonth ? dayjs(selectedMonth, "YYYY-MM") : null}
            onChange={handleMonthChange}
            format="YYYY-MM"
            placeholder="Pilih bulan"
            disabled={loading}
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-600 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">
                Peringatan
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Menutup bulan akan mengunci semua transaksi untuk periode
                tersebut. Pastikan semua data sudah benar sebelum melanjutkan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card loading={balanceLoading}>
          <Statistic
            title="Total Pemasukan"
            value={totalIncome}
            prefix="Rp"
            styles={{ content: { color: "#10B981" } }}
            formatter={(value) => `${value.toLocaleString("id-ID")}`}
          />
        </Card>

        <Card loading={balanceLoading}>
          <Statistic
            title="Total Pengeluaran"
            value={totalExpense}
            prefix="Rp"
            styles={{ content: { color: "#EF4444" } }}
            formatter={(value) => `${value.toLocaleString("id-ID")}`}
          />
        </Card>

        <Card loading={balanceLoading}>
          <Statistic
            title="Saldo Bersih"
            value={netAmount}
            prefix="Rp"
            styles={{
              content: { color: netAmount >= 0 ? "#10B981" : "#EF4444" },
            }}
            formatter={(value) => `${value.toLocaleString("id-ID")}`}
          />
        </Card>
      </div>

      {/* Transaction Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Ringkasan Transaksi Bulan {selectedMonth}
        </h3>

        <Row gutter={16}>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="Jumlah Transaksi"
                value={transactions.length}
                suffix="transaksi"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="Transaksi Pemasukan"
                value={
                  transactions.filter((t) => t.type === "pemasukan").length
                }
                suffix="transaksi"
                styles={{ content: { color: "#10B981" } }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="Transaksi Pengeluaran"
                value={
                  transactions.filter((t) => t.type === "pengeluaran").length
                }
                suffix="transaksi"
                styles={{ content: { color: "#EF4444" } }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Close Month Action */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tindakan Tutup Bulan
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Klik tombol di bawah untuk menutup periode bulan {selectedMonth}
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            danger
            loading={loading}
            onClick={handleCloseMonth}
            disabled={balanceLoading || transactions.length === 0}
            className="flex items-center gap-2"
          >
            <FaCheckCircle />
            {loading ? "Menutup Bulan..." : "Tutup Bulan"}
          </Button>
        </div>

        {transactions.length === 0 && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-gray-500" />
              <p className="text-sm text-gray-600">
                Tidak ada transaksi untuk bulan {selectedMonth}. Pastikan bulan
                yang dipilih sudah benar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutupBulanIndex;
