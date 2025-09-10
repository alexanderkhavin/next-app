// hooks/useInstructions.ts
'use client';

import { useState, useEffect } from 'react';
import { Instruction, apiClient } from '@/lib/api/client';

export function useInstructions() {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getInstructions();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setInstructions(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch instructions');
    } finally {
      setLoading(false);
    }
  };

  const createInstruction = async (instruction: Omit<Instruction, 'id'>) => {
    try {
      const response = await apiClient.createInstruction(instruction);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setInstructions(prev => [...prev, response.data!]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create instruction';
      setError(errorMessage);
      throw err;
    }
  };

  const updateInstruction = async (id: string, updates: Partial<Instruction>) => {
    try {
      const response = await apiClient.updateInstruction(id, updates);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setInstructions(prev => prev.map(inst => inst.id === id ? response.data! : inst));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update instruction';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteInstruction = async (id: string) => {
    try {
      const response = await apiClient.deleteInstruction(id);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setInstructions(prev => prev.filter(inst => inst.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete instruction';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  return {
    instructions,
    loading,
    error,
    fetchInstructions,
    createInstruction,
    updateInstruction,
    deleteInstruction,
  };
}