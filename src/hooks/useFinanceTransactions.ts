import { useState, useEffect } from 'react';
import { financeTransactionsApi } from '../services/financeClient';
import type { FinancialTransaction } from '../services/financeClient';

export const useFinanceTransactions = (month?: string) => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (selectedMonth?: string) => {
    const targetMonth = selectedMonth || month;
    if (!targetMonth) return;

    setLoading(true);
    setError(null);
    try {
      const response = await financeTransactionsApi.getByMonth(targetMonth);
      setTransactions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (data: {
    card_name: string;
    type: string;
    amount: number;
    description?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeTransactionsApi.create(data);
      setTransactions(prev => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (
    id: number,
    data: { type?: string; amount?: number; description?: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeTransactionsApi.update(id, data);
      setTransactions(prev => prev.map(tx => tx.id === id ? response.data : tx));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: number, selectedMonth?: string) => {
    setLoading(true);
    setError(null);
    try {
      await financeTransactionsApi.delete(id, selectedMonth || month);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (month) {
      fetchTransactions(month);
    }
  }, [month]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
