import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateCard from './CreateCard';
import EditCard from './EditCard';
import CardList from './CardList';

type FinanceCard = {
  id: number;
  card_name: string;
  status: string;
};

const KartuIndex: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [editingCard, setEditingCard] = useState<FinanceCard | null>(null);

  const handleCreateSuccess = () => {
    setActiveTab('list');
  };

  const handleEditSuccess = () => {
    setEditingCard(null);
    setActiveTab('list');
  };

  const handleEdit = (card: FinanceCard) => {
    setEditingCard(card);
    setActiveTab('edit');
  };

  return (
    <div className="space-y-6 ml-4 mr-4 mb-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Manajemen Kartu Keuangan
        </h2>

        <button
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
        >
          <FaPlus className="text-sm" />
          Tambah Kartu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'list' && (
          <CardList onEdit={handleEdit} />
        )}

        {activeTab === 'create' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Tambah Kartu Baru
              </h3>
              <button
                onClick={() => setActiveTab('list')}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <CreateCard onSuccess={handleCreateSuccess} />
          </div>
        )}

        {activeTab === 'edit' && editingCard && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Kartu
              </h3>
              <button
                onClick={() => setActiveTab('list')}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <EditCard
              card={editingCard}
              onSuccess={handleEditSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KartuIndex;
