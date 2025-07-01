import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User, type AuthContextType } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 檢查本地儲存的登入狀態
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userProfile = localStorage.getItem('userProfile');

    if (isLoggedIn && userEmail) {
      if (userProfile) {
        // 載入完整的用戶資料
        try {
          const profileData = JSON.parse(userProfile);
          setUser(profileData);
        } catch (error) {
          console.error('載入用戶資料失敗:', error);
          // 回退到基本資料
          setUser({
            email: userEmail,
            name: userName || undefined,
            isLoggedIn: true
          });
        }
      } else {
        // 基本用戶資料
        setUser({
          email: userEmail,
          name: userName || undefined,
          isLoggedIn: true
        });
      }
    }

    setIsLoading(false);
  }, []);

  const login = (email: string, name?: string) => {
    const userData: User = {
      email,
      name,
      isLoggedIn: true
    };

    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    if (name) {
      localStorage.setItem('userName', name);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userProfile');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      // 儲存到 localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      if (data.name) {
        localStorage.setItem('userName', data.name);
      }
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
