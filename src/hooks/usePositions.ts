// hooks/usePositions.ts
'use client';

import { useState, useEffect } from 'react';
import { Position, apiClient } from '@/lib/api/client';

export function usePositions() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getPositions();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setPositions(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  const createPosition = async (position: Omit<Position, 'id'>) => {
    try {
      const response = await apiClient.createPosition(position);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setPositions(prev => [...prev, response.data!]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create position';
      setError(errorMessage);
      throw err;
    }
  };

  const updatePosition = async (id: string, updates: Partial<Position>) => {
    try {
      const response = await apiClient.updatePosition(id, updates);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setPositions(prev => prev.map(pos => pos.id === id ? response.data! : pos));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update position';
      setError(errorMessage);
      throw err;
    }
  };

  const deletePosition = async (id: string) => {
    try {
      const response = await apiClient.deletePosition(id);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setPositions(prev => prev.filter(pos => pos.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete position';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return {
    positions,
    loading,
    error,
    fetchPositions,
    createPosition,
    updatePosition,
    deletePosition,
  };
}