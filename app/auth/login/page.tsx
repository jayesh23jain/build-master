'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FeatureAnimation from '@/components/FeatureAnimation';

type UserType = 'customer' | 'vendor' | null;

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    trade: '',
    license: '',
    rememberMe: false,
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (userType === 'customer') {
        router.push('/dashboard');
      } else {
        router.push('/vendor-dashboard');
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      trade: '',
      license: '',
      rememberMe: false,
      agreeTerms: false,
    });
  };

  const getBgColor = () => userType === 'vendor' ? 'bg-[#0d0f14]' : 'bg-[#0d0f14]';
  const getBadgeColor = () => userType === 'vendor' ? 'border-[#D911E3] text-[#D911E3]' : 'border-[#1FE0E4] text-[#1FE0E4]';
  const getButtonColor = () => userType === 'vendor' ? 'bg-[#D911E3] hover:bg-[#b30bc4]' : 'bg-[#1FE0E4] hover:bg-[#00D9E0]';
  const getHeadingColor = () => userType === 'vendor' ? 'text-[#D911E3]' : 'text-[#1FE0E4]';

  return (
    <div className={`min-h-screen ${getBgColor()} text-[#F4F6F8]`}>
      {/* Navigation Bar */}
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
          className="flex items-center justify-center p-6 md:p-8 min-h-[calc(100vh-80px)]"
        >
          <div className="w-full max-w-md">
            {!userType ? (
              // Role Selection
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-8 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-[#F4F6F8]">
                    Welcome to
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1FE0E4]">BUILD MASTER</h2>
                  <p className="text-[#889EAA] text-sm font-['JetBrains_Mono'] mt-4">
                    Choose how you'd like to join
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    onClick={() => {
                      setUserType('customer');
                      setIsLogin(true);
                      resetForm();
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-6 border-2 border-[#1FE0E4]/30 rounded-lg bg-[#1a1f2e]/30 hover:bg-[#1a1f2e]/60 hover:border-[#1FE0E4] transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#F4F6F8] group-hover:text-[#1FE0E4]">
                        👤 Customer
                      </h3>
                      <span className="text-[#1FE0E4]">→</span>
                    </div>
                    <p className="text-sm text-[#889EAA]">
                      Manage your build project with Build Master
                    </p>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setUserType('vendor');
                      setIsLogin(true);
                      resetForm();
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-6 border-2 border-[#D911E3]/30 rounded-lg bg-[#1a1f2e]/30 hover:bg-[#1a1f2e]/60 hover:border-[#D911E3] transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#F4F6F8] group-hover:text-[#D911E3]">
                        💼 Vendor
                      </h3>
                      <span className="text-[#D911E3]">→</span>
                    </div>
                    <p className="text-sm text-[#889EAA]">
                      Join our network and start earning
                    </p>
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-4 bg-[#1a1f2e]/50 border border-[#334155]/30 rounded-lg text-center"
                >
                  <p className="text-xs text-[#334155] font-['JetBrains_Mono']">
                    🔒 Your data is encrypted and secure
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              // Auth Forms
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Badge */}
                <div className={`mb-4 inline-block border ${getBadgeColor()} px-3 py-1 rounded text-xs font-['JetBrains_Mono'] uppercase tracking-[0.1em] font-bold`}>
                  {userType === 'vendor' ? (isLogin ? '🚀 VENDOR PORTAL' : '🚀 VENDOR ACCOUNT') : (isLogin ? '← RETURNING USER' : '✨ NEW ACCOUNT')}
                </div>

                {/* Heading */}
                <div className="mb-8">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3">
                    {userType === 'customer' ? (
                      <>
                        {isLogin ? (
                          <>Sign <span className={getHeadingColor()}>In</span></>
                        ) : (
                          <>Create <span className={getHeadingColor()}>Account</span></>
                        )}
                      </>
                    ) : (
                      <>
                        {isLogin ? (
                          <>Vendor <span className={getHeadingColor()}>Login</span></>
                        ) : (
                          <>Join as <span className={getHeadingColor()}>Vendor</span></>
                        )}
                      </>
                    )}
                  </h1>
                  <p className="text-[#889EAA] text-base">
                    {userType === 'customer'
                      ? (isLogin ? 'Access your Build Master dashboard' : 'Join Build Master and start your first project')
                      : (isLogin ? 'Access your Build Master dashboard' : 'Join Build Master and start your first project')
                    }
                  </p>
                </div>

                {/* Forms */}
                <form onSubmit={handleSubmit} className="space-y-5 mb-8">
                  {/* Register Fields */}
                  {!isLogin && (
                    <>
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                            placeholder="Alex"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                            placeholder="Chen"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                      {isLogin || userType === 'customer' ? 'EMAIL ADDRESS' : 'EMAIL ADDRESS'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                        placeholder="you@example.com"
                        required
                      />
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                        placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
                        required
                      />
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                        {userType === 'vendor' ? 'ENTER A PASSWORD' : 'CONFIRM PASSWORD'}
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  )}

                  {/* Vendor Specific Fields */}
                  {!isLogin && userType === 'vendor' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                          placeholder="Acme Construction Ltd."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                          TRADE / SPECIALTY
                        </label>
                        <select
                          name="trade"
                          value={formData.trade}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                          required
                        >
                          <option value="" disabled className="bg-[#0d0f14]">Select your trade</option>
                          <option value="plumbing" className="bg-[#0d0f14]">Plumbing</option>
                          <option value="electrical" className="bg-[#0d0f14]">Electrical</option>
                          <option value="carpentry" className="bg-[#0d0f14]">Carpentry</option>
                          <option value="masonry" className="bg-[#0d0f14]">Masonry</option>
                          <option value="painting" className="bg-[#0d0f14]">Painting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1FE0E4] mb-3 font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                          LICENSE NUMBER
                        </label>
                        <input
                          type="text"
                          name="license"
                          value={formData.license}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] placeholder-[#334155] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                          placeholder="e.g. GC-2024-00123"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Remember Me & Forgot Password (Login Only) */}
                  {isLogin && (
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-[#1FE0E4] font-['JetBrains_Mono'] uppercase tracking-[0.1em]">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-[#1FE0E4] hover:text-[#00D9E0] font-['JetBrains_Mono'] uppercase tracking-[0.1em] transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {/* Terms & Privacy (Register Only) */}
                  {!isLogin && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-1"
                        required
                      />
                      <span className="text-xs text-[#1FE0E4] font-['JetBrains_Mono'] uppercase tracking-[0.1em]">
                        I agree to terms & privacy policy
                      </span>
                    </label>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || (!isLogin && !formData.agreeTerms)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full px-6 py-4 font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-['JetBrains_Mono'] ${getButtonColor()} ${userType === 'vendor' ? 'text-[#F4F6F8]' : 'text-[#050505]'} text-lg`}
                  >
                    {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In →' : 'Create Account →')}
                  </motion.button>
                </form>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="my-6 flex items-center gap-4"
                >
                  <div className="flex-1 h-px bg-[#334155]/30" />
                  <span className="text-xs text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.1em]">Or continue with</span>
                  <div className="flex-1 h-px bg-[#334155]/30" />
                </motion.div>

                {/* Social Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3 mb-6"
                >
                  <button
                    type="button"
                    className="p-3 border border-[#334155] hover:border-[#1FE0E4]/50 text-[#F4F6F8] rounded transition-all hover:bg-[#1FE0E4]/10 flex items-center justify-center gap-2 font-['JetBrains_Mono'] text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    GOOGLE
                  </button>
                  <button
                    type="button"
                    className="p-3 border border-[#334155] hover:border-[#1FE0E4]/50 text-[#F4F6F8] rounded transition-all hover:bg-[#1FE0E4]/10 flex items-center justify-center gap-2 font-['JetBrains_Mono'] text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GITHUB
                  </button>
                </motion.div>

                {/* Toggle Auth Mode */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mb-6"
                >
                  <p className="text-[#889EAA] text-sm">
                    {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        resetForm();
                      }}
                      className="text-[#1FE0E4] hover:text-[#00D9E0] font-bold transition-colors"
                    >
                      {isLogin ? 'Register →' : 'Sign in →'}
                    </button>
                  </p>
                </motion.div>

                {/* Footer Links (Register Only) */}
                {!isLogin && (
                  <div className="text-center border-t border-[#334155]/20 pt-4">
                    <p className="text-xs text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.05em]">
                      TERMS OF SERVICE · PRIVACY POLICY · CONTRACTOR CODE
                    </p>
                  </div>
                )}

                {/* Back Button */}
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setUserType(null);
                      setIsLogin(true);
                      resetForm();
                    }}
                    className="text-xs text-[#889EAA] hover:text-[#1FE0E4] font-['JetBrains_Mono'] uppercase tracking-[0.1em] transition-colors"
                  >
                    ← Back to Role Selection
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
