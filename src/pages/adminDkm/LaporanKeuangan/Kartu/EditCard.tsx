import React, { useState } from 'react';
import { useFinanceCards } from '../../../../hooks/useFinanceCards';

interface EditCardProps {
  card: {
    id: number;
    card_name: string;
    status: string;
  };
  onSuccess: () => void;
}

const EditCard: React.FC<EditCardProps> = ({ card, onSuccess }) => {
  const { updateCard, loading } = useFinanceCards();
  const [cardName, setCardName] = useState(card.card_name);
  const [status, setStatus] = useState(card.status);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError('Nama kartu wajib diisi');
      return;
    }

    try {
      await updateCard(card.id, {
        card_name: cardName.trim(),
        status: status
      });
      alert('Kartu berhasil diperbarui');
      setError('');
      onSuccess();
    } catch (err) {
      setError('Gagal memperbarui kartu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="edit_card_name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Kartu
        </label>
        <input
          type="text"
          id="edit_card_name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Masukkan nama kartu"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="edit_status" className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="edit_status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          disabled={loading}
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? 'Memperbarui...' : 'Perbarui Kartu'}
      </button>
    </form>
  );
};

export default EditCard;
