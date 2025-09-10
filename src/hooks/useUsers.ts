// hooks/useUsers.ts
'use client';

import { useState, useEffect } from 'react';
import { User, UserRole, apiClient } from '@/lib/api/client';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getUsers();
      
      if (response.error) {
        setError(response.error);
        return;
      }
      
      setUsers(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await apiClient.createUser(user);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setUsers(prev => [...prev, response.data!]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const response = await apiClient.updateUser(id, updates);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setUsers(prev => prev.map(user => user.id === id ? response.data! : user));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await apiClient.deleteUser(id);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw err;
    }
  };

  const updateUserRole = async (id: string, role: UserRole) => {
    return updateUser(id, { role });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    updateUserRole,
    deleteUser,
  };
}