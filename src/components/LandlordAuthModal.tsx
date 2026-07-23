import React, { useState } from 'react';
import { Landlord } from '../types';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  Award,
  AlertCircle
} from 'lucide-react';

interface LandlordAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (landlord: Landlord) => void;
  onStartVerificationNow?: () => void;
}

export const LandlordAuthModal: React.FC<LandlordAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onStartVerificationNow
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+233 ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoLogin = () => {
    const demoLandlord: Landlord = {
      id: 'landlord-demo-1',
      name: 'Kwame Osei-Mensah',
      email: 'kwame.osei@rentdirect.gh',
      phone: '+233 24 412 3890',
      whatsapp: '+233 24 412 3890',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      responseRate: '98%',
      responseTime: 'Under 1 hour',
      isVerified: false,
      memberSince: '2026',
      propertiesListedCount: 3
    };

    onLoginSuccess(demoLandlord);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full legal name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (!phone.trim() || phone.length < 9) {
        setErrorMsg('Please enter a valid Ghanaian phone number (+233...).');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!agreedToTerms) {
        setErrorMsg('You must agree to the RentDirect Landlord Code of Conduct.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const newLandlord: Landlord = {
          id: `landlord-${Date.now()}`,
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          whatsapp: phone.trim(),
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          responseRate: '100%',
          responseTime: 'Immediate',
          isVerified: false,
          memberSince: '2026',
          propertiesListedCount: 0
        };

        onLoginSuccess(newLandlord);
        onClose();
        if (onStartVerificationNow) {
          onStartVerificationNow();
        }
      }, 1000);

    } else {
      // Sign In mode
      if (!email.trim()) {
        setErrorMsg('Please enter your registered email or phone.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const signedInLandlord: Landlord = {
          id: 'landlord-user-1',
          name: fullName || 'Kwame Osei-Mensah',
          email: email,
          phone: phone || '+233 24 412 3890',
          whatsapp: phone || '+233 24 412 3890',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          responseRate: '98%',
          responseTime: 'Under 1 hour',
          isVerified: false,
          memberSince: '2026',
          propertiesListedCount: 2
        };

        onLoginSuccess(signedInLandlord);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-neutral-200 relative text-neutral-900 my-auto">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 text-white p-6 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="bg-emerald-500 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Direct Landlord Portal
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                {mode === 'signup' ? 'Register Landlord Account' : 'Landlord Login'}
              </h2>
            </div>
          </div>

          <p className="text-xs text-neutral-300 mt-2 font-medium">
            List properties directly to verified tenants across Ghana with zero agent commission cuts.
          </p>

          {/* Tab switch */}
          <div className="flex items-center bg-white/10 p-1 rounded-2xl mt-4 border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                mode === 'signup'
                  ? 'bg-emerald-500 text-neutral-950 shadow-sm font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register (New)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                mode === 'login'
                  ? 'bg-emerald-500 text-neutral-950 shadow-sm font-extrabold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'signup' ? (
            <>
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Full Legal Name (as on Ghana Card) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kwame Osei-Mensah"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kwame@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Phone (Ghana) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 24 123 4567"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    I agree to the <strong>RentDirect Ghana Landlord Terms</strong> & code of zero illegal agent commission markups.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Landlord Account & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Email Address or Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kwame@example.com or +233 24..."
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Landlord Dashboard</span>
                    <LogIn className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          )}

          {/* Quick Demo Login Option */}
          <div className="pt-3 border-t border-neutral-100 text-center">
            <span className="text-[11px] text-neutral-400 font-medium block mb-2">
              Want to quickly explore without creating credentials?
            </span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Demo Login as Kwame Osei-Mensah</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
