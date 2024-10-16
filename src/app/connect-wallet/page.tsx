'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import BalanceUI from '../components/balance/page';




const ConnectWallet = () => {
  
  return (
    <TonConnectUIProvider manifestUrl='https://ton-dapp-pi.vercel.app/tonconnect-manifest.json'>
      <h1>Hello, Youtube</h1>
      <div style={{ "padding": '10rem' }}>
        <TonConnectButton />
        <BalanceUI/>
      </div>
    </TonConnectUIProvider>
  );
};

export default ConnectWallet;
