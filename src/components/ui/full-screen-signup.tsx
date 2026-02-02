"use client";

import { Box } from "lucide-react";
import { useState } from "react";
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

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
      // User-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        setGeneralError("This email is already registered. Try logging in.");
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setGeneralError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setGeneralError("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gray-950">
      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl">

        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 md:w-1/2 relative flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-8 cursor-pointer" onClick={onBack}>
              <div className="relative w-12 h-12 mr-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl transform rotate-45"></div>
                <div className="absolute inset-[3px] bg-gray-900 rounded-lg transform rotate-45"></div>
                <div className="relative z-10">
                  <Box className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter">CRYZO</span>
                <span className="block text-[10px] tracking-widest text-blue-400 font-bold uppercase">Wholesale</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
              {isLogin ? "Welcome Back." : "Join Cryzo."}
            </h1>
            <p className="text-lg text-gray-400 font-medium">
              {isLogin
                ? "Sign in to access wholesale pricing on iPhones and iPads."
                : "Create an account to unlock wholesale pricing on premium devices."
              }
            </p>
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
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {generalError}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full mb-4 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all hover:shadow-md disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">or</span>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@company.com"
                className={`text-sm w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 text-black focus:ring-blue-500 transition-all ${
                  emailError ? "border-red-500" : "border-gray-200"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1 font-bold">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`text-sm w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 text-black focus:ring-blue-500 transition-all ${
                  passwordError ? "border-red-500" : "border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 font-bold">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
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
                className="text-blue-600 font-bold hover:underline"
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
