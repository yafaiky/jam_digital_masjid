import { useState, useEffect, useCallback } from 'react';
import { financeCardsApi } from '../services/financeClient';
import type { FinanceCard } from '../services/financeClient';

export const useFinanceCards = () => {
  const [cards, setCards] = useState<FinanceCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeCardsApi.getAll();
      setCards(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCard = async (data: { card_name: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeCardsApi.create(data);
      setCards(prev => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create card');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCard = async (
    id: number,
    data: { card_name?: string; status?: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeCardsApi.update(id, data);
      setCards(prev =>
        prev.map(card => (card.id === id ? response.data : card))
      );
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update card');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await financeCardsApi.delete(id);
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete card');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
};
