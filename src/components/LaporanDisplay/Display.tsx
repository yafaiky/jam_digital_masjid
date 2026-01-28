import React, { useState } from "react";
import dayjs from "dayjs";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  Table,
  Tag,
  DatePicker,
} from "antd";
import { useFinanceTransactions } from "../../hooks/useFinanceTransactions";
import EditTransaction from "../../pages/adminDkm/LaporanKeuangan/Transaksi/EditTransaction";
import type { FinancialTransaction } from "../../services/financeClient";

const { MonthPicker } = DatePicker;

const TransaksiIndex: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("YYYY-MM"), // YYYY-MM format
  );
  const [editingTransaction, setEditingTransaction] =
    useState<FinancialTransaction | null>(null);

  const { transactions, loading } =
    useFinanceTransactions(selectedMonth);

  const handleMonthChange = (date: dayjs.Dayjs | null, dateString: string | null) => {
    setSelectedMonth(dateString || dayjs().format('YYYY-MM'));
  };

  const handleEditSuccess = () => {
    setEditingTransaction(null);
  };

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString("id-ID"),
      width: 120,
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "pemasukan" ? "green" : "red"}>
          {type === "pemasukan" ? "Pemasukan" : "Pengeluaran"}
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Jumlah",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `Rp ${amount.toLocaleString("id-ID")}`,
      width: 150,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
  ];

  return (
    <div className="space-y-6 ml-4 mr-4 mb-4 mt-4">

      {/* Month Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Pilih Bulan:
          </label>
          <MonthPicker
            value={selectedMonth ? dayjs(selectedMonth, "YYYY-MM") : null}
            onChange={handleMonthChange}
            format="YYYY-MM"
            placeholder="Pilih bulan"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

        <Table
          columns={columns}
          dataSource={transactions}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </div>

      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onSuccess={handleEditSuccess}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransaksiIndex;
