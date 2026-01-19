import React, { useState } from 'react';
import { useFinanceCards } from '../../../../hooks/useFinanceCards';

interface CreateCardProps {
  onSuccess: () => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onSuccess }) => {
  const { createCard, loading } = useFinanceCards();
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError('Nama kartu wajib diisi');
      return;
    }

    try {
      await createCard({ card_name: cardName.trim() });
      alert('Kartu berhasil dibuat');
      setCardName('');
      setError('');
      onSuccess();
    } catch (err) {
      setError('Gagal membuat kartu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card_name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Kartu
        </label>
        <input
          type="text"
          id="card_name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Masukkan nama kartu"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          disabled={loading}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? 'Membuat...' : 'Buat Kartu'}
      </button>
    </form>
  );
};

export default CreateCard;
