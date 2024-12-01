// 'use client';

// import { useTonWallet } from '@tonconnect/ui-react';
// import React, { useEffect, useState } from 'react';

// const BalanceUI = () => {
//   const [tonBalance, setTonBalance] = useState(0);
//   const wallet = useTonWallet();
//   const address = wallet?.account?.address;
//   const url = `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`;

//   useEffect(() => {
//     if (address) {
//       getBalance();
//     } else {
//       setTonBalance(0);
//     }
//   }, [address]);

//   const getBalance = async () => {
//     try {
//       const response = await fetch(url);
//       const res = await response.json();
//       setTonBalance(parseFloat(res.result.balance) / 1e9);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//       setTonBalance(0);
//     }
//   };

//   return (
//     <div>
//       <p>Balance: {tonBalance} TON</p>
//     </div>
//   );
// };

// export default BalanceUI;

'use client';

import { useTonWallet } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';

const BalanceUI = () => {
  // const [tonBalance, setTonBalance] = useState(0);
  const [jettonBalance, setJettonBalance] = useState(0);
  const [jettonName, setJettonName] = useState('');
  const wallet = useTonWallet();
  const address = wallet?.account?.address;
  const url = `https://testnet.tonapi.io/v2/accounts/${address}/jettons/0%3A1f74c74bb4f3626eb87ad03d8feae161f2a4aa1e44e5b723cf7986b0e920c6a6`;

  useEffect(() => {
    if (address) {
      getJettonBalance();
    } else {
      // setTonBalance(0);
      setJettonBalance(0);
      setJettonName('');
    }
  }, [address]);

  const getJettonBalance = async () => {
    try {
      const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
      const res = await response.json();
      console.log('API response:', res); 

      // Lấy số dư và tên từ JSON phản hồi
      const balance = res.balance;
      const jettonName = res.jetton?.name;

      if (balance && jettonName) {
        setJettonBalance(parseFloat(balance) / 1e9); 
        setJettonName(jettonName);
      } else {
        console.warn('Balance or metadata not found in response');
        setJettonBalance(0);
        setJettonName('');
      }
    } catch (error) {
      console.error('Error fetching jetton balance:', error);
      setJettonBalance(0);
      setJettonName('');
    }
  };

  return (
    <div>
      {/* <p>TON Balance: {tonBalance} TON</p> */}
      <p>Balance: {jettonBalance} {jettonName} </p>
    </div>
  );
};

export default BalanceUI;


