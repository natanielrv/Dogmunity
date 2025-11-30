// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { api } from '../config/api';

interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Llama a GET /auth/me con el token ya incluido por el interceptor
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          // Token inválido → lo eliminamos
          localStorage.removeItem('token');
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return { user, loading };
}
