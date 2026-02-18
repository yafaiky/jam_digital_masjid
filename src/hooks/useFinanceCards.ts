import { useState, useEffect, useCallback } from 'react';
import { financeCardsApi } from '../services/financeClient';
import type { CardWithBalance } from '../services/financeClient';

export const useFinanceCards = () => {
  const [cards, setCards] = useState<CardWithBalance[]>([]);
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
      // Refresh cards list untuk mendapat data dengan balance
      await fetchCards();
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
      // Refresh cards list untuk mendapat data terbaru
      await fetchCards();
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
