"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  browserLocalPersistence, 
  setPersistence 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  isAuthenticating: boolean;
  isSuccess: boolean;
  authError: string | null;
  openAuthModal: (onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  loginWithGoogle: (customName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Save callback to resume flows (like booking) after login
  const onSuccessCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    const isMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key-for-development";
    
    if (isMock) {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("mock_auth_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
      setLoading(false);
      return;
    }

    // Enable local persistence so sessions survive browser refresh
    const initPersistenceAndAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.error("Firebase persistence initialization failed:", err);
      }

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });

      return unsubscribe;
    };

    let unsubscribePromise = initPersistenceAndAuth();

    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  const openAuthModal = (onSuccess?: () => void) => {
    if (onSuccess) {
      onSuccessCallback.current = onSuccess;
    } else {
      onSuccessCallback.current = null;
    }
    setAuthError(null);
    setIsSuccess(false);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setIsSuccess(false);
    setAuthError(null);
  };

  const loginWithGoogle = async (customName?: string) => {
    setIsAuthenticating(true);
    setAuthError(null);
    setIsSuccess(false);

    const isMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key-for-development";

    try {
      if (isMock) {
        // Dev sign-in fallback with custom user name support
        await new Promise((resolve) => setTimeout(resolve, 600));
        const activeName = customName && customName.trim() ? customName.trim() : "Dinesh Narayan";
        const emailSlug = activeName.toLowerCase().replace(/\s+/g, ".");
        const mockUser = {
          uid: "user-uid-" + Date.now(),
          displayName: activeName,
          email: `${emailSlug}@gmail.com`,
          photoURL: null,
        };
        setUser(mockUser as any);
        if (typeof window !== "undefined") {
          localStorage.setItem("mock_auth_user", JSON.stringify(mockUser));
        }
        setIsSuccess(true);
        
        // Delay closing modal to show success animation
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setIsSuccess(false);
          if (onSuccessCallback.current) {
            onSuccessCallback.current();
            onSuccessCallback.current = null;
          }
        }, 1000);
        return;
      }

      // Real Firebase OAuth Sign-In flow
      await signInWithPopup(auth, googleProvider);
      setIsSuccess(true);
      
      // Delay closing modal to show success animation
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setIsSuccess(false);
        if (onSuccessCallback.current) {
          onSuccessCallback.current();
          onSuccessCallback.current = null;
        }
      }, 1000);
    } catch (err: any) {
      console.error("Google sign-in failed:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setAuthError("Popup closed by user. Please try again.");
      } else if (err.code === "auth/unauthorized-domain") {
        setAuthError("This domain is unauthorized. Please register it in your Firebase console.");
      } else {
        setAuthError("Failed to sign in. Please try again.");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    const isMock = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key-for-development";
    
    try {
      if (isMock) {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("mock_auth_user");
          window.location.href = "/";
        }
        return;
      }

      await signOut(auth);
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
        isSuccess,
        authError,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
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
