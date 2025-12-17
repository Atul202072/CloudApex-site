import React, { useState } from 'react';
import { CloudLightning, ArrowLeft, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
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
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
          if (!name) throw new Error("Name is required");
          await signup(email, name);
      } else {
          await login(email);
      }
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || "Authentication failed. Try 'alex.chen@cloudapex.com' for demo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white relative">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900 opacity-90 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
           <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
           <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={onBack}>
               <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 group-hover:bg-white/20 transition-all">
                 <CloudLightning className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight">CloudApex</span>
            </div>
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl xl:text-5xl font-bold font-['Space_Grotesk'] leading-tight mb-6 drop-shadow-lg">
              {isSignUp ? 'Start Your Journey.' : 'Master the Cloud.'}<br/>
              Build the Future.
            </h1>
            <p className="text-lg text-indigo-100 max-w-md leading-relaxed drop-shadow-md">
              "The best way to predict the future is to invent it. Join thousands of developers building scalable, secure, and robust applications."
            </p>
            
            <div className="flex items-center gap-4 mt-10">
               <div className="flex -space-x-4">
                  {[10, 12, 33, 54].map((id, i) => (
                    <div 
                      key={id} 
                      className="w-12 h-12 rounded-full border-2 border-indigo-900 bg-cover bg-center" 
                      style={{backgroundImage: `url('https://i.pravatar.cc/150?img=${id}')`}}
                    ></div>
                  ))}
               </div>
               <div className="text-sm font-medium pl-2">
                 <p className="text-white font-bold text-lg">5,000+</p>
                 <p className="text-indigo-200">Students Joined</p>
               </div>
            </div>
          </div>

          <div className="text-xs text-indigo-200/60 flex justify-between items-center border-t border-white/10 pt-6">
             <span>© 2024 CloudApex Inc.</span>
             <div className="flex gap-4">
               <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
               <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 relative bg-white z-10">
        <button 
          onClick={onBack}
          className="lg:hidden absolute top-6 left-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors bg-slate-50 p-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="mb-8 text-center lg:text-left mt-16 lg:mt-0">
           <div className="inline-block lg:hidden bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200 mb-6">
             <CloudLightning className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-3xl font-bold text-slate-900 font-['Space_Grotesk'] mb-3">
             {isSignUp ? 'Create Account' : 'Welcome Back! 👋'}
           </h2>
           <p className="text-slate-500 text-lg">
             {isSignUp ? 'Enter your details to get started.' : 'Please enter your details to sign in.'}
           </p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
           {isSignUp && (
               <div className="space-y-1.5">
                 <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                   </div>
                   <input 
                     type="text"
                     required
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                     placeholder="John Doe"
                   />
                 </div>
               </div>
           )}

           <div className="space-y-1.5">
             <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
             <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
               </div>
               <input 
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                 placeholder="Enter your email"
               />
             </div>
           </div>

           <div className="space-y-1.5">
             <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
             <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
               </div>
               <input 
                 type={showPassword ? 'text' : 'password'}
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="block w-full pl-11 pr-12 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white"
                 placeholder="••••••••"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
               >
                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
               </button>
             </div>
           </div>

           {!isSignUp && (
               <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">Forgot password?</a>
               </div>
           )}

           <Button 
             type="submit" 
             variant="primary" 
             className="w-full !py-4 !rounded-xl !text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
             disabled={isLoading}
           >
             {isLoading ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 {isSignUp ? 'Creating Account...' : 'Signing in...'}
               </span>
             ) : (isSignUp ? 'Create Account' : 'Sign In')}
           </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline focus:outline-none">
            {isSignUp ? 'Sign in' : 'Sign up for free'}
          </button>
        </p>
      </div>
    </div>
  );
};
