'use client';
import { createContext, useCallback, useMemo, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
const ConnectWalletPopup = dynamic(() => import('../components/ConnectWalletPopup'), { ssr: false });

type PopupContextValue = {
  addWallet: () => void
};

export const PopupContext = createContext<PopupContextValue | undefined>(undefined);

const PopupProvider = ({ children }: Readonly<{
  children: React.ReactNode
}>) => {
  const { isConnected } = useAccount();
  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState<boolean>(!isConnected);

  const addWallet = useCallback(() => {
    setIsWalletPopupOpen(true);
  }, []);

  const value = useMemo<PopupContextValue>(() => ({ addWallet }), [addWallet]);

  return (
    <PopupContext.Provider value={value}>
      <ConnectWalletPopup open={isWalletPopupOpen} onClose={() => setIsWalletPopupOpen(false)} />
      {children}
    </PopupContext.Provider>
  );
};

export function useWalletPopup(): PopupContextValue {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error('useWalletPopup must be used within PopupContext');
  return ctx;
}

export default PopupProvider;
