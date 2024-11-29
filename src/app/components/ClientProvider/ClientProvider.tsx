'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

const ClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-dapp-two.vercel.app/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
};

export default ClientProvider;
