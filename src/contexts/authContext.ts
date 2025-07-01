import { createContext } from 'react';

export interface User {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  isLoggedIn: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
