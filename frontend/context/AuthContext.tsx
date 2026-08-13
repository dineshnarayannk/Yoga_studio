"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  role: "USER" | "ADMIN";
  profile_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  isAuthenticating: boolean;
  isOnboarding: boolean;
  isSuccess: boolean;
  authError: string | null;
  openAuthModal: (onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  handleGoogleSuccess: (credential: string) => Promise<void>;
  handleGoogleError: () => void;
  completeProfile: (name: string, phone: string, preferred_practice: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set axios defaults for cross-origin cookies
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const onSuccessCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const openAuthModal = (onSuccess?: () => void) => {
    if (onSuccess) {
      onSuccessCallback.current = onSuccess;
    } else {
      onSuccessCallback.current = null;
    }
    setAuthError(null);
    setIsSuccess(false);
    setIsOnboarding(false);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setIsSuccess(false);
    setIsOnboarding(false);
    setAuthError(null);
  };

  const executeCallbackAndClose = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setIsSuccess(false);
      if (onSuccessCallback.current) {
        onSuccessCallback.current();
        onSuccessCallback.current = null;
      }
    }, 1000);
  };

  const handleGoogleSuccess = async (credential: string) => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const res = await api.post("/auth/google", { credential });
      if (res.data.success) {
        const authUser = res.data.user;
        setUser(authUser);
        
        if (!authUser.profile_completed) {
          setIsOnboarding(true);
        } else {
          executeCallbackAndClose();
        }
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      setAuthError(err.response?.data?.message || "Failed to sign in. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleError = () => {
    setAuthError("Google Sign-In was closed or failed.");
  };

  const completeProfile = async (name: string, phone: string, preferred_practice: string) => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const res = await api.post("/auth/complete-profile", { name, phone, preferred_practice });
      if (res.data.success) {
        setUser(res.data.user);
        setIsOnboarding(false);
        executeCallbackAndClose();
      }
    } catch (err: any) {
      console.error("Profile completion error:", err);
      setAuthError(err.response?.data?.message || "Failed to complete profile.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Log out failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        isAuthenticating,
        isOnboarding,
        isSuccess,
        authError,
        openAuthModal,
        closeAuthModal,
        handleGoogleSuccess,
        handleGoogleError,
        completeProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
