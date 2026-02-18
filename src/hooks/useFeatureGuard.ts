import { useState, useCallback, useEffect } from 'react';
import { featuresApi } from '../services/financeClient';
import type { TenantFeature } from '../services/financeClient';

export const useFeatureGuard = (clientId?: string) => {
  const [features, setFeatures] = useState<TenantFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeatures = useCallback(async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await featuresApi.getAll(id);
      setFeatures(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch features');
      console.error('Error fetching features:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const isFeatureEnabled = useCallback((featureKey: string): boolean => {
    const feature = features.find(f => f.feature_key === featureKey);
    return feature?.enabled ?? false;
  }, [features]);

  const toggleFeature = useCallback(async (id: string, featureKey: string, enabled: boolean) => {
    try {
      await featuresApi.toggle(id, featureKey, enabled);
      // Refresh features list
      await getFeatures(id);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to toggle feature');
      console.error('Error toggling feature:', err);
      return false;
    }
  }, [getFeatures]);

  const deleteFeature = useCallback(async (id: string, featureKey: string) => {
    try {
      await featuresApi.delete(id, featureKey);
      // Refresh features list
      await getFeatures(id);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete feature');
      console.error('Error deleting feature:', err);
      return false;
    }
  }, [getFeatures]);

  useEffect(() => {
    if (clientId) {
      getFeatures(clientId);
    }
  }, [clientId, getFeatures]);

  return {
    features,
    loading,
    error,
    getFeatures,
    isFeatureEnabled,
    toggleFeature,
    deleteFeature,
  };
};
