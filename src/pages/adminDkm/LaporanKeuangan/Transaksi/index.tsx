import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Table, Button, Popconfirm, message, Tag, Select, DatePicker } from 'antd';
import { useFinanceTransactions } from '../../../../hooks/useFinanceTransactions';
import { useFinanceCards } from '../../../../hooks/useFinanceCards';
import EditTransaction from './EditTransaction';
import type { FinancialTransaction } from '../../../../services/financeClient';

const { Option } = Select;
const { MonthPicker } = DatePicker;

const TransaksiIndex: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<FinancialTransaction | null>(null);

  const { transactions, loading, createTransaction, deleteTransaction } = useFinanceTransactions(selectedMonth);
  const { cards } = useFinanceCards();

  // Form state for creating transaction
  const [cardName, setCardName] = useState('');
  const [type, setType] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [createError, setCreateError] = useState('');

  const handleMonthChange = (date: any, dateString: string | null) => {
    setSelectedMonth(dateString || new Date().toISOString().slice(0, 7));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!cardName || !amount || isNaN(numAmount) || numAmount <= 0) {
      setCreateError('Semua field wajib diisi dengan nilai yang valid');
      return;
    }

    try {
      await createTransaction({
        card_name: cardName,
        type,
        amount: numAmount,
        description: description.trim() || undefined,
      });
      message.success('Transaksi berhasil dibuat');
      setCardName('');
      setAmount('');
      setDescription('');
      setCreateError('');
      setShowCreateForm(false);
    } catch (err) {
      setCreateError('Gagal membuat transaksi');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id, selectedMonth);
      message.success('Transaksi berhasil dihapus');
    } catch (error) {
      message.error('Gagal menghapus transaksi');
    }
  };

  const handleEdit = (transaction: FinancialTransaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditSuccess = () => {
    setEditingTransaction(null);
  };

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString('id-ID'),
      width: 120,
    },
    {
      title: 'Kartu',
      dataIndex: 'card_name',
      key: 'card_name',
      width: 150,
    },
    {
      title: 'Tipe',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'pemasukan' ? 'green' : 'red'}>
          {type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Jumlah',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`,
      width: 150,
    },
    {
      title: 'Deskripsi',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: FinancialTransaction) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus transaksi ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<FaTrash />}
            >
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Transaksi Keuangan</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-500 transition-all duration-300"
        >
          <FaPlus className="text-sm" />
          Tambah Transaksi
        </button>
      </div>

      {/* Month Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Pilih Bulan:</label>
          <MonthPicker
            value={selectedMonth ? new Date(selectedMonth + '-01') : null}
            onChange={handleMonthChange}
            format="YYYY-MM"
            placeholder="Pilih bulan"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {showCreateForm && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Tambah Transaksi Baru</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="card_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Kartu Keuangan
                  </label>
                  <Select
                    id="card_name"
                    value={cardName}
                    onChange={setCardName}
                    placeholder="Pilih kartu"
                    className="w-full"
                    disabled={loading}
                  >
                    {cards.map(card => (
                      <Option key={card.id} value={card.card_name}>
                        {card.card_name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Transaksi
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as 'pemasukan' | 'pengeluaran')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    disabled={loading}
                  >
                    <option value="pemasukan">Pemasukan</option>
                    <option value="pengeluaran">Pengeluaran</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah (Rp)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi transaksi (opsional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>

              {createError && <p className="text-sm text-red-600">{createError}</p>}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? 'Membuat...' : 'Buat Transaksi'}
                </button>
              </div>
            </form>
          </div>
        )}

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
