"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const {
    user,
    loading,
    isAuthModalOpen,
    isAuthenticating,
    isSuccess,
    authError,
    openAuthModal,
    closeAuthModal,
    loginWithGoogle,
    logout,
  } = useAuthContext();

  return {
    user,
    loading,
    isAuthModalOpen,
    isAuthenticating,
    isSuccess,
    authError,
    isAuthenticated: !!user,
    openAuthModal,
    closeAuthModal,
    loginWithGoogle,
    logout,
  };
}
