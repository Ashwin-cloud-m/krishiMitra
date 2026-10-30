import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (role: UserRole, customName?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
  isExpert: boolean;
  isModerator: boolean;
  isAdmin: boolean;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'usr_farmer_01',
    name: 'Ramesh Patil',
    phone: '+91 98220 14589',
    role: 'farmer',
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Pimpalgaon Baswant',
    landSizeAcre: 4.5,
    primaryCrops: ['Soybean', 'Onion', 'Tomato'],
    preferredLanguage: 'mr',
    verifiedBadge: true,
    avatar: '👨‍🌾'
  },
  expert: {
    id: 'usr_expert_01',
    name: 'Dr. Sunita Deshmukh',
    phone: '+91 94231 87654',
    role: 'expert',
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'KVK Pimpalgaon Centre',
    landSizeAcre: 0,
    primaryCrops: ['Horticulture', 'Oilseeds', 'Entomology'],
    preferredLanguage: 'mr',
    verifiedBadge: true,
    expertCredentials: 'Senior Entomologist, Krishi Vigyan Kendra (KVK) & MPKV Rahuri Alumnus',
    avatar: '🔬'
  },
  moderator: {
    id: 'usr_mod_01',
    name: 'Amitabh Verma',
    phone: '+91 98112 34567',
    role: 'moderator',
    state: 'Madhya Pradesh',
    district: 'Indore',
    village: 'Sanwer Block',
    landSizeAcre: 6.0,
    primaryCrops: ['Soybean', 'Wheat'],
    preferredLanguage: 'hi',
    verifiedBadge: true,
    avatar: '🛡️'
  },
  admin: {
    id: 'usr_admin_01',
    name: 'KrishiMitra Node Administrator',
    phone: '+91 98000 00001',
    role: 'admin',
    state: 'National Agronet',
    district: 'Decentralized Network',
    village: 'Hub 01',
    landSizeAcre: 0,
    primaryCrops: ['System Infrastructure'],
    preferredLanguage: 'en',
    verifiedBadge: true,
    avatar: '⚙️'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('km_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_USERS.farmer;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('km_user', JSON.stringify(user));
  }, [user]);

  const login = (role: UserRole, customName?: string) => {
    const base = DEFAULT_USERS[role];
    const newUser = customName ? { ...base, name: customName } : base;
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const switchRole = (role: UserRole) => {
    setUser(DEFAULT_USERS[role]);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        switchRole,
        isExpert: user.role === 'expert',
        isModerator: user.role === 'moderator' || user.role === 'admin',
        isAdmin: user.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
