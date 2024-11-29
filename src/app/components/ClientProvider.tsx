'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-dapp-two.vercel.app/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
};

export default ClientProvider;
