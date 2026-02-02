"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

// Iconic Cryzo Logo Component
const CryzoLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-lg', sub: 'text-[8px]' },
    md: { container: 'w-12 h-12', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { container: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Icon - Diamond/Crystal shape */}
      <div className={`${s.container} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl transform rotate-45 shadow-lg shadow-cyan-500/30" />
        <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg transform rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan-400 font-black text-lg">C</span>
        </div>
      </div>
      <div>
        <span className={`${s.text} font-black tracking-tight text-white`}>CRYZO</span>
        <span className={`block ${s.sub} tracking-[0.2em] text-cyan-400 font-bold uppercase`}>Wholesale</span>
      </div>
    </div>
  );
};

export const FullScreenSignup = ({ onSuccess, onBack }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setGeneralError("This email is already registered. Try signing in.");
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setGeneralError("Invalid email or password.");
      } else if (error.code === 'auth/user-not-found') {
        setGeneralError("No account found with this email.");
      } else if (error.code === 'auth/too-many-requests') {
        setGeneralError("Too many attempts. Please try again later.");
      } else {
        setGeneralError(error.message || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gray-950 relative">
      {/* Close button */}
      <button
        onClick={onBack}
        className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl border border-white/10">

        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white p-8 md:p-12 md:w-1/2 relative flex flex-col justify-center overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="mb-10 cursor-pointer" onClick={onBack}>
              <CryzoLogo size="md" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              {isLogin ? (
                <>Welcome<br /><span className="text-cyan-400">Back.</span></>
              ) : (
                <>Join<br /><span className="text-cyan-400">Cryzo.</span></>
              )}
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
              {isLogin
                ? "Sign in to access wholesale pricing on premium devices."
                : "Create an account to unlock wholesale pricing on iPhones and iPads."
              }
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                100+ Verified Dealers
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                Secure Payments
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-white text-gray-900 justify-center">
          <h2 className="text-3xl font-black mb-2 tracking-tight text-gray-900">
            {isLogin ? "Sign In" : "Get Started"}
          </h2>
          <p className="text-gray-500 mb-8">
            {isLogin ? "Enter your credentials below" : "Create your wholesale account"}
          </p>

          {generalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {generalError}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@company.com"
                className={`text-sm w-full py-3.5 px-4 border-2 rounded-xl focus:outline-none focus:ring-0 bg-gray-50 text-black transition-all ${
                  emailError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-cyan-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1.5 font-bold">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Minimum 8 characters"
                className={`text-sm w-full py-3.5 px-4 border-2 rounded-xl focus:outline-none focus:ring-0 bg-gray-50 text-black transition-all ${
                  passwordError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-cyan-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1.5 font-bold">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-2"
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </button>

            <div className="text-center text-gray-500 text-sm mt-4 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmailError("");
                  setPasswordError("");
                  setGeneralError("");
                }}
                className="text-cyan-600 font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
