"use client";

import { useAuth } from "@/hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const { user, loading, handleGoogleSuccess, handleGoogleError, isAuthenticating, authError } = useAuth();
  const router = useRouter();
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        setLocalError("Access Denied. Your account does not have administrator privileges.");
      }
    }
  }, [user, loading, router]);

  const displayError = localError || authError;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1f1d] p-8 rounded-3xl shadow-xl border border-astrian-clay dark:border-white/10 text-center">
        
        <div className="mx-auto w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6 shadow-lg">
          <ShieldCheck className="h-8 w-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-display font-bold text-astrian-charcoal dark:text-gray-100 mb-2">
          Admin Portal
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Sign in with your authorized Google administrator account to manage Yoga Studio.
        </p>

        {displayError && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex items-start gap-3 text-left">
            <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-600 dark:text-rose-400">
              {displayError}
            </p>
          </div>
        )}

        <div className="flex justify-center relative">
          {isAuthenticating || loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-astrian-sage" />
              <p className="text-sm text-gray-500">Verifying credentials...</p>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={(res) => {
                  setLocalError(null);
                  if (res.credential) handleGoogleSuccess(res.credential);
                }}
                onError={handleGoogleError}
                theme="filled_black"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
