// hooks/useLocations.ts
'use client';

import { useState, useEffect } from 'react';
import { Location, apiClient } from '@/lib/api/client';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getLocations();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setLocations(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  };

  const createLocation = async (location: Omit<Location, 'id'>) => {
    try {
      const response = await apiClient.createLocation(location);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setLocations(prev => [...prev, response.data!]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create location';
      setError(errorMessage);
      throw err;
    }
  };

  const updateLocation = async (id: string, updates: Partial<Location>) => {
    try {
      const response = await apiClient.updateLocation(id, updates);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setLocations(prev => prev.map(loc => loc.id === id ? response.data! : loc));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update location';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const response = await apiClient.deleteLocation(id);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setLocations(prev => prev.filter(loc => loc.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete location';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locations,
    loading,
    error,
    fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
  };
}