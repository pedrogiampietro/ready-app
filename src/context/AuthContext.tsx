import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  trips: Trip[];
  avatar_url: string;
  bucket_url?: string;
}

interface Trip {
  id: string;
  title: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  setUser: any;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user@readyApp", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user@readyApp");
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedUser = await AsyncStorage.getItem("user@readyApp");
      if (storedUser) {
        const userData: User = JSON.parse(storedUser);
        setUser(userData);
      }
    };

    checkLoggedInUser();
  }, []);

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
