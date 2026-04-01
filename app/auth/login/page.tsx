'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const FeatureAnimation = dynamic(() => import('@/components/FeatureAnimation'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0d0f14]/50 animate-pulse rounded-lg" />
});

type UserType = 'customer' | 'vendor' | null;

export default function LoginPage() {
  const { login, loginWithGoogle, register, error, clearError, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState('');
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

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('Registration successful! Please login.');
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccess('');

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
          role: userType as 'customer' | 'vendor',
          rememberMe: formData.rememberMe,
        });
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: userType as 'customer' | 'vendor',
          trade: formData.trade,
          license: formData.license,
        });
      }
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
    setSuccess('');
    clearError();
  };

  const getButtonColor = () => {
    if (userType === 'vendor') return 'bg-[#D911E3] hover:bg-[#B80EC2] shadow-[0_0_20px_rgba(217,17,227,0.3)]';
    return 'bg-[#1FE0E4] hover:bg-[#00D9E0] shadow-[0_0_20px_rgba(31,224,228,0.3)]';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F6F8] font-['Inter'] selection:bg-[#1FE0E4]/30">
      {/* Navigation */}
      <nav className="h-20 border-b border-[#334155]/20 px-6 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1FE0E4] to-[#D911E3] rounded-lg rotate-12 transition-transform group-hover:rotate-0" />
            <span className="text-xl font-bold tracking-tighter font-['Quintessential'] uppercase tracking-[0.2em] bg-gradient-to-r from-[#F4F6F8] to-[#889EAA] bg-clip-text text-transparent">
              Structura
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/help" className="text-sm text-[#889EAA] hover:text-[#1FE0E4] transition-colors font-['JetBrains_Mono']">
              SUPPORT
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Left Side - Animation / Content */}
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
               // Auth Form (Login or Register)
               <AnimatePresence mode="wait">
                 <motion.div
                   key={isLogin ? 'login' : 'register'}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="space-y-6"
                 >
                   <div>
                     <h2 className={`text-3xl font-bold mb-2 ${userType === 'vendor' ? 'text-[#D911E3]' : 'text-[#1FE0E4]'}`}>
                       {isLogin ? `Sign in as ${userType}` : `Register as ${userType}`}
                     </h2>
                     <p className="text-sm text-[#889EAA]">
                       {isLogin ? 'Welcome back! Enter your details.' : 'Complete the form to create your account.'}
                     </p>
                   </div>
 
                   {(error || success) && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className={`p-4 rounded border text-sm flex items-start gap-3 ${
                         error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-[#1FE0E4]/10 border-[#1FE0E4]/20 text-[#1FE0E4]'
                       }`}
                     >
                       <span className="mt-0.5">{error ? '⚠️' : '✅'}</span>
                       <p>{error || success}</p>
                     </motion.div>
                   )}
 
                   <form onSubmit={handleSubmit} className="space-y-4">
                     {!isLogin && (
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                             FIRST NAME
                           </label>
                           <input
                             type="text"
                             name="firstName"
                             value={formData.firstName}
                             onChange={handleInputChange}
                             placeholder="John"
                             className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                             required
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                             LAST NAME
                           </label>
                           <input
                             type="text"
                             name="lastName"
                             value={formData.lastName}
                             onChange={handleInputChange}
                             placeholder="Doe"
                             className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                             required
                           />
                         </div>
                       </div>
                     )}
 
                     {/* Vendor Specific Fields */}
                     {!isLogin && userType === 'vendor' && (
                       <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                               PRIMARY TRADE
                             </label>
                             <select
                               name="trade"
                               value={formData.trade}
                               onChange={handleInputChange}
                               className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                               required
                             >
                               <option value="" disabled className="bg-[#0d0f14]">Select your trade</option>
                               <option value="Structural Framing" className="bg-[#0d0f14]">Structural Framing</option>
                               <option value="Foundation & Excavation" className="bg-[#0d0f14]">Foundation & Excavation</option>
                               <option value="Electrical & MEP" className="bg-[#0d0f14]">Electrical & MEP</option>
                               <option value="Interiors & Woodwork" className="bg-[#0d0f14]">Interiors & Woodwork</option>
                               <option value="General Contractor" className="bg-[#0d0f14]">General Contractor</option>
                               <option value="Roofing" className="bg-[#0d0f14]">Roofing</option>
                               <option value="Architecture & Design" className="bg-[#0d0f14]">Architecture & Design</option>
                             </select>
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                               LICENSE NUMBER
                             </label>
                             <input
                               type="text"
                               name="license"
                               value={formData.license}
                               onChange={handleInputChange}
                               placeholder="GC-12345678"
                               className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                               required
                             />
                           </div>
                         </div>
                       </div>
                     )}
 
                     <div className="space-y-2">
                       <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                         EMAIL ADDRESS
                       </label>
                       <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         placeholder="name@company.com"
                         className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                         required
                       />
                     </div>
 
                     <div className="space-y-2">
                       <div className="flex justify-between items-center">
                         <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                           PASSWORD
                         </label>
                         {isLogin && (
                           <button type="button" className="text-[10px] text-[#1FE0E4] hover:underline">
                             FORGOT?
                           </button>
                         )}
                       </div>
                       <input
                         type="password"
                         name="password"
                         value={formData.password}
                         onChange={handleInputChange}
                         placeholder="••••••••"
                         className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                         required
                       />
                     </div>
 
                     {!isLogin && (
                       <div className="space-y-2">
                         <label className="text-[10px] text-[#334155] font-['JetBrains_Mono'] uppercase tracking-[0.2em] block">
                           CONFIRM PASSWORD
                         </label>
                         <input
                           type="password"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleInputChange}
                           placeholder="••••••••"
                           className="w-full px-4 py-3 bg-transparent border border-[#334155] text-[#F4F6F8] focus:outline-none focus:border-[#1FE0E4] transition-colors rounded"
                           required
                         />
                       </div>
                     )}
 
                     <div className="flex items-center justify-between py-2">
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input
                           type="checkbox"
                           name={isLogin ? "rememberMe" : "agreeTerms"}
                           checked={isLogin ? formData.rememberMe : formData.agreeTerms}
                           onChange={handleInputChange}
                           className="w-4 h-4 rounded border-[#334155] bg-transparent text-[#1FE0E4] focus:ring-offset-0 focus:ring-0"
                         />
                         <span className="text-xs text-[#889EAA]">
                           {isLogin ? 'Remember me for 30 days' : 'I agree to the Terms & Privacy'}
                         </span>
                       </label>
                     </div>
 
                     <motion.button
                       type="submit"
                       disabled={isLoading || (!isLogin && !formData.agreeTerms)}
                       whileHover={{ scale: 1.01 }}
                       whileTap={{ scale: 0.99 }}
                       className={`w-full py-4 rounded font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${getButtonColor()} text-[#050505]`}
                     >
                       {isLoading ? (
                         <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                       ) : (
                         isLogin ? 'SIGN IN →' : 'CREATE ACCOUNT →'
                       )}
                     </motion.button>
 
                     <div className="relative py-4">
                       <div className="absolute inset-0 flex items-center">
                         <div className="w-full border-t border-[#334155]/30"></div>
                       </div>
                       <div className="relative flex justify-center text-xs uppercase">
                         <span className="bg-[#050505] px-2 text-[#334155] font-['JetBrains_Mono']">Or continue with</span>
                       </div>
                     </div>
 
                     <div className="flex flex-col items-center justify-center gap-4">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            if (credentialResponse.credential) {
                              loginWithGoogle(
                                credentialResponse.credential, 
                                userType || undefined
                              );
                            }
                          }}
                          onError={() => {
                            console.error('Login Failed');
                          }}
                          useOneTap
                          theme="filled_black"
                          shape="pill"
                          text="continue_with"
                          size="large"
                          width="100%"
                        />
                     </div>
 
                     <div className="text-center pt-4">
                       <p className="text-sm text-[#889EAA]">
                         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                         <button
                           type="button"
                           onClick={() => setIsLogin(!isLogin)}
                           className="text-[#1FE0E4] hover:underline font-bold"
                         >
                           {isLogin ? 'Register now' : 'Sign in here'}
                         </button>
                       </p>
                       <button
                         type="button"
                         onClick={() => setUserType(null)}
                         className="mt-6 text-xs text-[#334155] hover:text-[#889EAA] flex items-center gap-2 mx-auto uppercase tracking-widest font-['JetBrains_Mono']"
                       >
                         ← Back to selection
                       </button>
                     </div>
                   </form>
                 </motion.div>
               </AnimatePresence>
             )}
           </div>
         </motion.div>
       </main>
     </div>
   );
 }
