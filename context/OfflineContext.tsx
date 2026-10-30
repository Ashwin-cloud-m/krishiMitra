import React, { createContext, useContext, useState, useEffect } from 'react';

export interface QueuedItem {
  id: string;
  type: 'community_post' | 'alert_report' | 'advisory_query';
  payload: any;
  createdAt: string;
  title: string;
}

interface OfflineContextType {
  isOnline: boolean;
  toggleSimulatedOffline: () => void;
  isSimulatedOffline: boolean;
  outbox: QueuedItem[];
  addToOutbox: (item: Omit<QueuedItem, 'id' | 'createdAt'>) => void;
  syncOutbox: () => Promise<number>;
  clearOutbox: () => void;
  lastSyncedAt: string;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [outbox, setOutbox] = useState<QueuedItem[]>(() => {
    const saved = localStorage.getItem('km_outbox');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(() => {
    return localStorage.getItem('km_last_sync') || 'Just now';
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('km_outbox', JSON.stringify(outbox));
  }, [outbox]);

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline(prev => !prev);
  };

  const effectiveOnline = isOnline && !isSimulatedOffline;

  const addToOutbox = (item: Omit<QueuedItem, 'id' | 'createdAt'>) => {
    const newItem: QueuedItem = {
      ...item,
      id: 'out_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toLocaleTimeString()
    };
    setOutbox(prev => [newItem, ...prev]);
  };

  const syncOutbox = async (): Promise<number> => {
    const count = outbox.length;
    if (count === 0) return 0;
    
    // Simulate background synchronization
    await new Promise(res => setTimeout(res, 800));
    setOutbox([]);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncedAt(now);
    localStorage.setItem('km_last_sync', now);
    return count;
  };

  const clearOutbox = () => {
    setOutbox([]);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline: effectiveOnline,
        toggleSimulatedOffline,
        isSimulatedOffline,
        outbox,
        addToOutbox,
        syncOutbox,
        clearOutbox,
        lastSyncedAt
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
