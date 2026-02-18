import { useState, useCallback } from 'react';
import { financeReportApi } from '../services/financeClient';
import type { MonthlyRecapReport } from '../services/financeClient';

export const useFinanceReport = () => {
  const [report, setReport] = useState<MonthlyRecapReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMonthlyDetail = useCallback(async (month: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeReportApi.getMonthlyDetail(month);
      setReport(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch report');
      console.error('Error fetching report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportPDF = useCallback(async (month: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await financeReportApi.exportMonthlyPDF(month);
      
      // Create blob and download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `recap-${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to export PDF');
      console.error('Error exporting PDF:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    report,
    loading,
    error,
    getMonthlyDetail,
    exportPDF,
  };
};
