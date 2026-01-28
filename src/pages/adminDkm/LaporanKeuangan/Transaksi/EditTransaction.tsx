import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useFinanceTransactions } from '../../../../hooks/useFinanceTransactions';
import type { FinancialTransaction } from '../../../../services/financeClient';

interface EditTransactionProps {
  transaction: FinancialTransaction;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditTransaction: React.FC<EditTransactionProps> = ({ transaction, onSuccess, onCancel }) => {
  const { updateTransaction, loading } = useFinanceTransactions();
  const [type, setType] = useState(transaction.type);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [description, setDescription] = useState(transaction.description || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Jumlah harus berupa angka positif');
      return;
    }

    try {
      await updateTransaction(transaction.id, {
        type: type as 'pemasukan' | 'pengeluaran',
        amount: numAmount,
        description: description.trim() || undefined,
      });
      alert('Transaksi berhasil diperbarui');
      onSuccess();
    } catch (err) {
      setError('Gagal memperbarui transaksi');
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Transaksi</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit_type" className="block text-sm font-medium text-gray-700 mb-2">
              Tipe Transaksi
            </label>
            <select
              id="edit_type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              disabled={loading}
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit_amount" className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah (Rp)
            </label>
            <input
              type="number"
              id="edit_amount"
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
            <label htmlFor="edit_description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <input
              type="text"
              id="edit_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi transaksi (opsional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              disabled={loading}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
