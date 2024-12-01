'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cart.module.css';
import Alert from '@mui/material/Alert';
import { Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTonAddress } from '@tonconnect/ui-react'; // Thêm import này
import { beginCell, toNano, Address } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  owner: string; // Thêm owner cho mỗi sản phẩm
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]); 
  const [totalPrice, setTotalPrice] = useState<number>(0); 
  const [openAlert, setOpenAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [dialogMessage, setDialogMessage] = useState('');
  
  const userFriendlyAddress = useTonAddress(); 
  const rawAddress = useTonAddress(false);
  const [jettonWalletAddress, setJettonWalletAddress] = useState<string | null>(null);

  const [tonConnectUI] = useTonConnectUI(); // Kết nối TonConnect UI để thực hiện giao dịch

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    const total = savedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
    setTotalPrice(total);

    if (userFriendlyAddress) {
      console.log('User-friendly address:', userFriendlyAddress);

      const fetchJettonWallet = async () => {
        try {
          const url = `https://testnet.tonapi.io/v2/accounts/${rawAddress}/jettons/0%3A1f74c74bb4f3626eb87ad03d8feae161f2a4aa1e44e5b723cf7986b0e920c6a6`;
          const response = await fetch(url);
          const data = await response.json();
          const walletAddress = data.wallet_address?.address;
          setJettonWalletAddress(walletAddress || null);
          if (walletAddress) {
            console.log('Jetton Wallet Address:', walletAddress);
          } else {
            console.log('No Jetton wallet address found');
          }
        } catch (error) {
          console.error('Error fetching Jetton wallet:', error);
        }
      };

      fetchJettonWallet();
    }
  }, [userFriendlyAddress, rawAddress]);

  const handleRemoveProduct = (id: string) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const total = updatedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
    setTotalPrice(total);
    setAlertMessage('Product removed from cart');
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handlePaymentClick = () => {
    if (userFriendlyAddress) {
      console.log('User-friendly Wallet Address:', userFriendlyAddress);
    } else {
      console.log('Wallet Address not found');
    }

    if (cart.length === 0) {
      setDialogMessage('Your cart is empty');
    } else {
      setDialogMessage(`Do you want to proceed with payment for a total of ${totalPrice} GITN?`);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmPayment = async () => {
    if (!jettonWalletAddress) {
      console.log('No Jetton wallet address available');
      return;
    }
  
    const recipientAddress = cart[0]?.owner;
    if (!recipientAddress) {
      console.log('No recipient address found');
      return;
    }
  
    const generateComment = () => {
      const productDetails = cart.map(
        (product) => `Product Name: ${product.name}\nPrice: ${product.price} GITN`
      ).join('\n');
      return `${productDetails}\n` +
             `Total Products: ${cart.length}\n` +
             `Total Price: ${totalPrice} GITN\n` +
             `Recipient Address: ${recipientAddress}`;
    };
  
    const forwardPayload = beginCell()
      .storeUint(0, 32)
      .storeStringTail(generateComment())
      .endCell();
  
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32)
      .storeUint(0, 64)
      .storeCoins(toNano(totalPrice.toString()))
      .storeAddress(Address.parse(recipientAddress))
      .storeAddress(Address.parse('0:0000000000000000000000000000000000000000000000000000000000000000'))
      .storeBit(0)
      .storeCoins(toNano('0.02'))
      .storeBit(1)
      .storeRef(forwardPayload)
      .endCell();
  
    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: jettonWalletAddress,
          amount: toNano('0.05').toString(),
          payload: body.toBoc().toString('base64'),
        },
      ],
    };
  
    try {
      await tonConnectUI.sendTransaction(myTransaction);
  
      // Sau khi giao dịch thành công, xóa giỏ hàng
      setCart([]); // Cập nhật trạng thái giỏ hàng
      localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
      setDialogMessage('Payment successful! Your cart is now empty.');
  
    } catch (error) {
      console.error('Transaction failed:', error);
      setDialogMessage('Transaction failed. Check console for details.');
    }
  
    setOpenDialog(false);
  };
  

  return (
    <div className={styles.wrapper}>
      {/* Snackbar */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <p>{dialogMessage}</p>
        </DialogContent>
        <DialogActions>
          {cart.length > 0 && (
            <Button onClick={handleConfirmPayment} color="primary" variant="contained">
              Confirm
            </Button>
          )}
          <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
            {cart.length > 0 ? 'Cancel' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>

      <h1>Shopping Cart</h1>
      <div className={styles.project}>
        <div className={styles.shop}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((product) => (
              <div key={product.id} className={styles.box}>
                <Image src={product.image} alt={product.name} width={200} height={200} className="img" />
                <div className={styles.content}>
                  <h3>{product.name}</h3>
                  <h4>Price: {product.price} GITN</h4>
                  {/* <h4>Owner: {product.owner}</h4> */}
                  <p className={styles.btnArea} onClick={() => handleRemoveProduct(product.id)}>
                    Remove
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.rightBar}>
          <p><span>Products</span> <span>{cart.length}</span></p>
          <hr />
          <p className={styles.price}>
            Total: <span>{totalPrice} GITN</span>
          </p>
          <div>
            <button className={styles.btnPayment} onClick={handlePaymentClick}>
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

