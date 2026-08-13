"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export function AuthModal() {
  const {
    user,
    isAuthModalOpen,
    closeAuthModal,
    handleGoogleSuccess,
    handleGoogleError,
    completeProfile,
    isAuthenticating,
    isOnboarding,
    isSuccess,
    authError
  } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredPractice, setPreferredPractice] = useState("");

  // Initialize name from user if onboarding
  useEffect(() => {
    if (isOnboarding && user && !name) {
      setName(user.name || "");
    }
  }, [isOnboarding, user, name]);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form state when closed
      setName("");
      setPhone("");
      setPreferredPractice("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  const handleSubmitProfile = async () => {
    if (!name.trim()) return;
    await completeProfile(name, phone, preferredPractice);
  };

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
            className="relative w-full max-w-md bg-[#F8FBF6]/95 dark:bg-[#0F1611]/95 backdrop-blur-2xl border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden z-10 transition-colors duration-300"
          >
            {/* Background decorative glows */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-[#8DA97B]/20 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-[#5D7555]/20 blur-2xl pointer-events-none" />

            {/* Close Trigger */}
            {!isAuthenticating && (
              <button
                onClick={closeAuthModal}
                className="absolute top-6 right-6 h-8 w-8 rounded-full bg-[#C9D7C3]/30 dark:bg-white/10 text-[#233228] dark:text-[#C9D7C3] flex items-center justify-center hover:bg-[#8DA97B]/30 transition-colors cursor-pointer z-20"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              {isOnboarding && user?.profile_image ? (
                <div className="h-16 w-16 rounded-full mx-auto mb-4 shadow-md overflow-hidden border-2 border-[#8DA97B]">
                  <img src={user.profile_image} alt="Profile" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#2D4632] to-[#5D7555] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Sparkles className="h-5 w-5 text-[#F8F7F2]" />
                </div>
              )}
              
              <h3 className="text-2xl font-bold font-display text-[#233228] dark:text-[#F4F8F2] mb-2">
                {isOnboarding ? "Complete Your Profile" : "Welcome to Team Astrion"}
              </h3>
              <p className="text-xs text-[#52625A] dark:text-[#C9D7C3] font-light">
                {isOnboarding 
                  ? "Just a few more details to complete your registration." 
                  : "Sign in to book live sessions, get complimentary passes, and manage your wellness journey."}
              </p>
            </div>

            {/* Content States */}
            <div className="space-y-6 relative z-10">
              
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
                    {isOnboarding ? "Profile Completed!" : "Authentication Successful!"}
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

              {/* Flow States */}
              {!isSuccess && (
                <div className="space-y-4">
                  {isOnboarding ? (
                    // Onboarding Form
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                          Email (From Google)
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ""}
                          className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-gray-100 dark:bg-[#1a1c1a] text-gray-500 dark:text-gray-400 text-sm cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                          Preferred Practice
                        </label>
                        <select
                          value={preferredPractice}
                          onChange={(e) => setPreferredPractice(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none transition-colors appearance-none"
                        >
                          <option value="">Select a practice...</option>
                          <option value="Vinyasa Flow">Vinyasa Flow</option>
                          <option value="Hatha Harmony">Hatha Harmony</option>
                          <option value="Restorative Yin">Restorative Yin</option>
                        </select>
                      </div>

                      <button
                        onClick={handleSubmitProfile}
                        disabled={isAuthenticating || !name.trim()}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-astrian-sage to-[#5D7555] text-white px-6 py-3.5 rounded-2xl shadow-md font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      >
                        {isAuthenticating ? "Saving..." : "Confirm & Continue"}
                      </button>
                    </div>
                  ) : (
                    // Google Login Button
                    <div className="flex justify-center flex-col items-center gap-4">
                      <div className="w-full relative">
                        {isAuthenticating && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-lg">
                            <div className="h-5 w-5 border-2 border-astrian-sage border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <div className="flex justify-center overflow-hidden rounded-xl">
                           <GoogleLogin
                             onSuccess={(credentialResponse) => {
                               if (credentialResponse.credential) {
                                 handleGoogleSuccess(credentialResponse.credential);
                               }
                             }}
                             onError={() => {
                               handleGoogleError();
                             }}
                             useOneTap
                             theme="outline"
                             size="large"
                             text="continue_with"
                             shape="rectangular"
                             width="300"
                           />
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-center text-astrian-charcoal/50 dark:text-gray-500 font-light max-w-xs mx-auto leading-relaxed">
                        By authenticating, you agree to our Terms of Practice and consent to cookies storing your local session persistence.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
