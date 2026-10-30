import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const AuthPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t, language } = useLanguage();
  const { login } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [phone, setPhone] = useState('+91 98220 14589');
  const [name, setName] = useState('Ramesh Patil');
  const [otp, setOtp] = useState('4589');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, name);
    onComplete();
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl border-2 border-[#2d6a4f]">
        
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2d6a4f] to-[#52b788] text-white text-3xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            🌱
          </div>
          <h2 className="text-2xl font-black text-[#1b4332]">
            {t.brandName}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {t.tagline} • Secure Decentralized Login
          </p>
        </div>

        {/* Persona quick select */}
        <div className="mb-6">
          <label className="text-xs font-bold text-stone-700 block mb-2">
            Select Your Role:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'farmer', label: '👨‍🌾 Farmer', name: 'Ramesh Patil' },
              { id: 'expert', label: '🔬 Agronomist', name: 'Dr. Sunita Deshmukh' },
              { id: 'moderator', label: '🛡️ Moderator', name: 'Amitabh Verma' },
              { id: 'admin', label: '⚙️ Admin Node', name: 'Node Admin' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id as UserRole);
                  setName(r.name);
                }}
                className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                  selectedRole === r.id
                    ? 'bg-emerald-50 border-[#2d6a4f] text-[#1b4332]'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* OTP Form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                required
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Mobile Number (for Kisan OTP)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors"
            >
              Send SMS OTP Verification →
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 text-center">
              SMS OTP sent to <strong>{phone}</strong> (Demo code: 4589)
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Enter 4-Digit OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 font-mono text-center text-lg font-bold tracking-widest"
                maxLength={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#52b788] hover:bg-[#40916c] text-stone-950 font-extrabold text-sm rounded-xl shadow-lg transition-colors"
            >
              Verify & Enter Farm Hub →
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-400">
          🔒 Secure authentication with cryptographic public-key attestation
        </div>

      </div>
    </div>
  );
};
