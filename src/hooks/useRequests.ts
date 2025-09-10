// hooks/useRequests.ts
'use client';

import { useState, useEffect } from 'react';
import { Request, apiClient } from '@/lib/api/client';

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getRequests();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setRequests(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (request: Omit<Request, 'id'>) => {
    try {
      const response = await apiClient.createRequest(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setRequests(prev => [...prev, response.data!]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create request';
      setError(errorMessage);
      throw err;
    }
  };

  const updateRequest = async (id: string, updates: Partial<Request>) => {
    try {
      const response = await apiClient.updateRequest(id, updates);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setRequests(prev => prev.map(req => req.id === id ? response.data! : req));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update request';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const response = await apiClient.deleteRequest(id);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setRequests(prev => prev.filter(req => req.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete request';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    createRequest,
    updateRequest,
    deleteRequest,
  };
}