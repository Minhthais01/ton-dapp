'use client';

import { useTonWallet } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';

const BalanceUI = () => {
  const [tonBalance, setTonBalance] = useState(0);
  const wallet = useTonWallet();
  const address = wallet?.account?.address;
  const url = `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`;

  useEffect(() => {
    if (address) {
      getBalance();
    } else {
      setTonBalance(0);
    }
  }, [address]);

  const getBalance = async () => {
    try {
      const response = await fetch(url);
      const res = await response.json();
      setTonBalance(parseFloat(res.result.balance) / 1e9);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setTonBalance(0);
    }
  };

  return (
    <div>
      <p>Balance: {tonBalance} TON</p>
    </div>
  );
};

export default BalanceUI;
