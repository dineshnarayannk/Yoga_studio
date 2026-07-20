"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogle,
    isAuthenticating,
    isSuccess,
    authError
  } = useAuth();

  const [customName, setCustomName] = useState("");

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isAuthenticating ? closeAuthModal : undefined}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-[#FDFBF7] dark:bg-[#121413] border border-astrian-clay dark:border-white/10 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden z-10 transition-colors duration-300"
          >
            {/* Background decorative glows */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-astrian-sage/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-astrian-sage/10 blur-2xl pointer-events-none" />

            {/* Close Trigger */}
            {!isAuthenticating && (
              <button
                onClick={closeAuthModal}
                className="absolute top-6 right-6 h-8 w-8 rounded-full bg-astrian-clay/20 dark:bg-white/5 text-astrian-charcoal dark:text-gray-300 flex items-center justify-center hover:bg-astrian-clay/40 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              <div className="h-12 w-12 rounded-full bg-astrian-sage text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-2">
                Welcome to Astrion
              </h3>
              <p className="text-sm text-astrian-charcoal/60 dark:text-gray-400 font-light">
                Sign in to book classes, track your practice, and manage your custom wellness goals.
              </p>
            </div>

            {/* Content States */}
            <div className="space-y-6">
              
              {/* Success State */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-4 space-y-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-emerald-500"
                  >
                    <CheckCircle2 className="h-14 w-14" />
                  </motion.div>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Authentication Successful!
                  </p>
                </motion.div>
              )}

              {/* Error messages */}
              {authError && !isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-light leading-relaxed">
                    {authError}
                  </p>
                </motion.div>
              )}

              {/* Action Flow */}
              {!isSuccess && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="customName" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      id="customName"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={() => loginWithGoogle(customName)}
                    disabled={isAuthenticating}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 text-astrian-charcoal dark:text-gray-200 px-6 py-3.5 rounded-2xl shadow-sm font-semibold hover:border-astrian-sage/30 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer focus:outline-none"
                  >
                    {isAuthenticating ? (
                      <div className="h-5 w-5 border-2 border-astrian-sage border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="h-5 w-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    )}
                    <span>{isAuthenticating ? "Connecting..." : "Continue with Google"}</span>
                  </button>

                  <p className="text-[10px] text-center text-astrian-charcoal/40 dark:text-gray-500 font-light max-w-xs mx-auto leading-relaxed">
                    By authenticating, you agree to our Terms of Practice and consent to cookies storing your local session persistence.
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
