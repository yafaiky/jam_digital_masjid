import { useState, useCallback } from 'react';
import { financeBalanceApi } from '../services/financeClient';
import type { RealtimeBalance } from '../services/financeClient';

export const useFinanceBalance = () => {
  const [balance, setBalance] = useState<RealtimeBalance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRealtimeBalance = useCallback(async (month?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeBalanceApi.getRealtime(month);
      setBalance(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch balance');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const closeMonth = useCallback(async (month: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeBalanceApi.closeMonth({ month });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to close month');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    balance,
    loading,
    error,
    getRealtimeBalance,
    closeMonth,
  };
};
