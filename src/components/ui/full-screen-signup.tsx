"use client";
 
import { SunIcon as Sunburst } from "lucide-react";
import { useState } from "react";
// import { auth } from '../../services/firebase'; // Uncomment when firebase is set up
// import { createUserWithEmailAndPassword } from "firebase/auth";

 
export const FullScreenSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
 
  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
 
  const validatePassword = (value: string) => {
    return value.length >= 8;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
 
    setSubmitted(true);
 
    if (valid) {
      try {
        // await createUserWithEmailAndPassword(auth, email, password);
        console.log("Form submitted!");
        console.log("Email:", email);
        alert("Account created successfully!");
        setEmail("");
        setPassword("");
        setSubmitted(false);
      } catch (error: any) {
        console.error(error);
        alert(error.message);
      }
    }
  };
 
  return (
    <div className="min-h-screen  flex items-center justify-center overflow-hidden p-4l bg-gray-50">
      <div className=" w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl">
        <div className="w-full h-full z-2 absolute bg-linear-to-t from-transparent to-black pointer-events-none"></div>
        <div className="flex absolute z-2  overflow-hidden backdrop-blur-2xl pointer-events-none">
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
        </div>
        <div className="w-[15rem] h-[15rem] bg-blue-600 absolute z-1 rounded-full bottom-0 pointer-events-none blur-3xl opacity-20"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0 pointer-events-none blur-2xl opacity-10"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0 pointer-events-none blur-2xl opacity-10"></div>
 
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 relative flex flex-col justify-center overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
              Welcome to Cryzo.
            </h1>
            <p className="text-lg text-gray-400 font-medium">
              The premium destination for wholesale electronics and mobile devices.
            </p>
          </div>
        </div>
 
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-white z-[99] text-gray-900 justify-center">
          <div className="flex flex-col items-left mb-8">
            <div className="text-blue-600 mb-4">
              <Sunburst className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tight text-gray-900">
              Get Started
            </h2>
          </div>
 
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="hi@cryzo.io"
                className={`text-sm w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 text-black focus:ring-blue-500 transition-all ${
                  emailError ? "border-red-500" : "border-gray-200"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && (
                <p id="email-error" className="text-red-500 text-xs mt-1 font-bold">
                  {emailError}
                </p>
              )}
            </div>
 
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Create password
              </label>
              <input
                type="password"
                id="password"
                className={`text-sm w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 text-black focus:ring-blue-500 transition-all ${
                  passwordError ? "border-red-500" : "border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
              />
              {passwordError && (
                <p id="password-error" className="text-red-500 text-xs mt-1 font-bold">
                  {passwordError}
                </p>
              )}
            </div>
 
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
 
            <div className="text-center text-gray-400 text-sm mt-4 font-medium">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-bold hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
