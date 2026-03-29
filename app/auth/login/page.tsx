'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FeatureAnimation from '@/components/FeatureAnimation';
import EnhancedButton from '@/components/EnhancedButton';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(isLogin ? 'Login successful!' : 'Account created successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#F4F6F8]">
      {/* Navigation */}
      <nav className="border-b border-[#334155]/30 bg-[#0d0f14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-wider text-[#1FE0E4] font-['JetBrains_Mono']">
            BUILD MASTER
          </Link>
          <Link
            href="/"
            className="text-[#889EAA] hover:text-[#1FE0E4] transition-colors text-sm font-['JetBrains_Mono']"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Side - Feature Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-[#0d0f14] to-[#1a1f2e]"
        >
          <div className="w-full h-full">
            <FeatureAnimation />
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center p-6 md:p-12"
        >
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                <span className="text-[#F4F6F8]">{isLogin ? 'Welcome Back' : 'Get Started'}</span>
              </h1>
              <p className="text-[#889EAA] text-sm font-['JetBrains_Mono']">
                {isLogin
                  ? 'Sign in to your Build Master account'
                  : 'Create your Build Master account today'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-xs font-bold tracking-[0.2em] text-[#889EAA] mb-2 font-['JetBrains_Mono']">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#334155]/50 rounded-lg text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors"
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-xs font-bold tracking-[0.2em] text-[#889EAA] mb-2 font-['JetBrains_Mono']">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#334155]/50 rounded-lg text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors"
                  placeholder="••••••••"
                />
              </motion.div>

              {/* Confirm Password (Register Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#889EAA] mb-2 font-['JetBrains_Mono']">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#334155]/50 rounded-lg text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors"
                    placeholder="••••••••"
                  />
                </motion.div>
              )}

              {/* Login Link */}
              {isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end"
                >
                  <button
                    type="button"
                    className="text-xs text-[#1FE0E4] hover:text-[#00D9E0] transition-colors font-['JetBrains_Mono'] font-bold"
                  >
                    Forgot Password?
                  </button>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#1FE0E4] text-[#050505] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-[#00D9E0] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-['JetBrains_Mono']"
                >
                  {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-[#334155]/30" />
              <span className="text-xs text-[#334155] font-['JetBrains_Mono']">OR</span>
              <div className="flex-1 h-px bg-[#334155]/30" />
            </div>

            {/* Toggle Sign Up / Sign In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-[#889EAA] text-sm mb-3">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-[#1FE0E4] hover:text-[#00D9E0] font-bold uppercase tracking-[0.2em] text-xs transition-colors font-['JetBrains_Mono']"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 bg-[#1a1f2e]/50 border border-[#334155]/30 rounded-lg text-center"
            >
              <p className="text-xs text-[#334155] font-['JetBrains_Mono']">
                🔒 Your data is encrypted and secure
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
