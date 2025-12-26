'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved auth data on app load
    if (typeof window === 'undefined') return;

    const savedUser = localStorage.getItem('boozmandu_user');
    const savedToken = localStorage.getItem('boozmandu_token');

    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setToken(savedToken);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('boozmandu_user');
        localStorage.removeItem('boozmandu_token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('boozmandu_user', JSON.stringify(data.user));
        localStorage.setItem('boozmandu_token', data.token);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('boozmandu_user', JSON.stringify(data.user));
        localStorage.setItem('boozmandu_token', data.token);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        // Return the actual error message from the API
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('boozmandu_user');
      localStorage.removeItem('boozmandu_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
