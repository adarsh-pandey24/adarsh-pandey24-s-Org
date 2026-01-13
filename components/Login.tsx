
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || ( !isLogin && !name )) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email, isLogin ? (name || email.split('@')[0]) : name);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden text-slate-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]"></div>

      <div className="w-full max-w-md px-6 z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative">
          <div className="flex flex-col items-center mb-10">
            {/* New Sophisticated Logo */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] rotate-12 opacity-20 scale-110 group-hover:rotate-45 transition-transform duration-500"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-white/20">
                <svg className="w-10 h-10 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18H17M7 14H17M7 10H11M13 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10L13 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 4V10H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 15L19 19M19 15L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
              Clause<span className="text-emerald-500">X</span>
            </h1>
            <p className="text-slate-400 text-sm text-center font-medium max-w-[240px]">
              {isLogin ? 'Intelligent analysis for your digital loan portfolio' : 'Start managing your credit commitments with AI'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-tighter">Forgot?</button>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className={`w-full py-4 mt-4 rounded-2xl font-black text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xl ${
                isLoading 
                ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-emerald-500/25'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 text-xs font-medium hover:text-emerald-400 transition-colors"
            >
              {isLogin ? (
                <>New to ClauseX? <span className="text-emerald-500 font-bold ml-1">Register Now</span></>
              ) : (
                <>Already have an account? <span className="text-emerald-500 font-bold ml-1">Sign In</span></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          Powered by Gemini Intelligence
        </p>
      </div>
    </div>
  );
};

export default Login;
