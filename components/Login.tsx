
import React, { useState, useEffect } from 'react';
import { CloudLightning, ArrowLeft, Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Typing Effect Logic
  const words = ["Cloud Engineering.", "DevOps Mastery.", "Data Analytics.", "System Design."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout: number;

    if (!isDeleting && displayedText === word) {
      timeout = window.setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      timeout = window.setTimeout(() => {}, 500);
    } else {
      const nextText = isDeleting 
        ? word.substring(0, displayedText.length - 1)
        : word.substring(0, displayedText.length + 1);
      
      const speed = isDeleting ? 40 : 80;
      timeout = window.setTimeout(() => setDisplayedText(nextText), speed);
    }

    return () => window.clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  useEffect(() => {
    setError('');
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
          if (!name.trim()) throw new Error("Full name is required.");
          if (password.length < 6) throw new Error("Password must be at least 6 characters.");
          if (password !== confirmPassword) throw new Error("Passwords do not match.");
          await signup(email, name, password);
      } else {
          if (!email.trim() || !password.trim()) throw new Error("Please enter both email and password.");
          await login(email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const avatars = [
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=44",
    "https://i.pravatar.cc/100?img=68"
  ];

  return (
    <div className="min-h-screen flex font-sans bg-white relative overflow-hidden">
      {/* Left Panel - Branding & Social Proof */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#1e1b4b]">
        {/* Geometric Depth Circles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute -top-[10%] -left-[10%] w-[120%] aspect-square rounded-full bg-white/5 pointer-events-none"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[60%] aspect-square rounded-full bg-white/5 pointer-events-none"></div>
           <div className="absolute top-[40%] left-[20%] w-[80%] aspect-square rounded-full bg-indigo-500/5 pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          {/* Internal Logo */}
          <div>
            <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={onBack}>
               <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                 <CloudLightning className="w-8 h-8 text-white" />
               </div>
               <span className="text-2xl font-bold tracking-tight font-display">CloudApex</span>
            </div>
          </div>
          
          <div className="mb-12">
            <h1 className="text-6xl font-bold font-display leading-[1.1] mb-12 drop-shadow-sm">
              Join the Elite.<br/>
              <span className="inline-block mt-4 text-white/95">
                Master <span className="text-indigo-300 drop-shadow-[0_0_20px_rgba(165,180,252,0.6)] font-extrabold">{displayedText}</span>
                <span className="ml-1 w-1.5 h-12 bg-indigo-300 inline-block animate-pulse align-middle"></span>
              </span>
            </h1>

            {/* 3D Glass Quote Box */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] max-w-xl">
                <p className="text-xl text-indigo-50 leading-relaxed font-medium mb-12 opacity-90 italic">
                  "The best way to predict the future is to invent it. Join thousands of developers building scalable, secure, and robust applications."
                </p>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {avatars.map((url, i) => (
                      <div 
                        key={i} 
                        className="size-16 rounded-full border-4 border-[#1e1b4b] bg-slate-300 overflow-hidden shadow-xl"
                      >
                        <img src={url} alt="Student" className="w-full h-full object-cover grayscale" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white leading-none">5,000+</h4>
                    <p className="text-indigo-200/80 font-bold text-sm tracking-wide mt-1">Students Joined</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="text-sm text-indigo-200/40 flex justify-between items-center pt-8">
             <span>© 2024 CloudApex Inc.</span>
             <div className="flex gap-10">
               <span className="hover:text-white cursor-pointer transition-all hover:underline underline-offset-4">Privacy</span>
               <span className="hover:text-white cursor-pointer transition-all hover:underline underline-offset-4">Terms</span>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-48 relative bg-white z-10 py-16">
        <button 
          onClick={onBack}
          className="lg:hidden absolute top-8 left-8 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-bold text-sm uppercase tracking-wider">Back</span>
        </button>

        <div className="mb-12 text-left">
           <h2 className="text-5xl font-bold text-[#0f172a] font-display mb-4 tracking-tight">
             {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
           </h2>
           <p className="text-slate-500 text-xl font-medium opacity-80">
             {isSignUp ? 'Enter your details to create an account.' : 'Please enter your details to sign in.'}
           </p>
        </div>

        {error && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 rounded-[1.25rem] text-sm flex items-start gap-4 animate-in shake duration-500 shadow-sm">
                <AlertCircle className="text-lg shrink-0 mt-0.5" size={22} />
                <span className="font-semibold leading-relaxed">{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
           {isSignUp && (
               <div className="space-y-3">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                     <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                   </div>
                   <input 
                     type="text"
                     required
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="block w-full pl-14 pr-6 py-6 border-none rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white shadow-inner"
                     placeholder="John Doe"
                   />
                 </div>
               </div>
           )}

           <div className="space-y-3">
             <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
             <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                 <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
               </div>
               <input 
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="block w-full pl-14 pr-6 py-6 border-none rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white shadow-inner"
                 placeholder="name@example.com"
               />
             </div>
           </div>

           <div className="space-y-3">
             <div className="flex items-center justify-between px-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                {!isSignUp && <a href="#" className="text-xs font-black text-indigo-600 hover:text-indigo-500 transition-all hover:underline underline-offset-4">Forgot password?</a>}
             </div>
             <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
               </div>
               <input 
                 type={showPassword ? 'text' : 'password'}
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="block w-full pl-14 pr-16 py-6 border-none rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50 focus:bg-white shadow-inner"
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-indigo-600 transition-all focus:outline-none"
               >
                 {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
               </button>
             </div>
           </div>

           {!isSignUp && (
               <div className="flex items-center gap-3 px-1">
                  <input type="checkbox" className="size-6 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all shadow-sm" />
                  <span className="text-base font-bold text-slate-500 transition-colors">Remember me</span>
               </div>
           )}

           <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-6 rounded-[1.5rem] text-lg font-black text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-3"
            >
              <span className={`flex items-center gap-3 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {isSignUp ? 'Create Account' : 'Sign In Now'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="animate-spin h-8 w-8 text-white" />
                </div>
              )}
            </button>
           </div>
        </form>

        <p className="mt-20 text-center text-slate-500 font-bold text-lg">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)} 
            className="font-black text-indigo-600 hover:text-indigo-500 transition-all ml-1 hover:underline underline-offset-8"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};
