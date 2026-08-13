"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const {
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
  } = useAuthContext();

  return {
    user,
    loading,
    isAuthModalOpen,
    isAuthenticating,
    isOnboarding,
    isSuccess,
    authError,
    isAuthenticated: !!user,
    openAuthModal,
    closeAuthModal,
    handleGoogleSuccess,
    handleGoogleError,
    completeProfile,
    logout,
  };
}
