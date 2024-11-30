'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cart.module.css';
import Alert from '@mui/material/Alert';
import { Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTonAddress } from '@tonconnect/ui-react'; // Thêm import này

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // Sử dụng useTonAddress để lấy địa chỉ ví
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    const total = savedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
    setTotalPrice(total);

    // Hiển thị địa chỉ ví trong console
    if (userFriendlyAddress) {
      console.log('User-friendly address:', userFriendlyAddress);
    } else {
      console.log('No wallet address found');
    }
    if (rawAddress) {
      console.log('Raw address:', rawAddress);
    } else {
      console.log('No raw address found');
    }
  }, [userFriendlyAddress, rawAddress]); // Thêm các giá trị này vào dependencies để cập nhật khi thay đổi

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

  const handleConfirmPayment = () => {
    console.log('Payment Confirmed!');
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
          <p><span>Total</span> <span>{totalPrice} GITN</span></p>
          <button className={styles.btnPayment} onClick={handlePaymentClick}>
            Payment
          </button>
        </div>
      </div>
    </div>
  );
}






// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import styles from './cart.module.css';
// import Alert from '@mui/material/Alert';
// import { Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

// interface Product {
//   id: string;
//   name: string;
//   price: string;
//   image: string;
//   owner: string; // Address of the product owner
// }

// export default function Cart() {
//   const [cart, setCart] = useState<Product[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [openAlert, setOpenAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);

//   const [tonConnectUI] = useTonConnectUI(); // TonConnect UI

//   // Jetton Master address (replace with the actual address)
//   const jettonMasterAddress = 'kQAfdMdLtPNibrh60D2P6uFh8qSqHkTltyPPeYaw6SDGpthg';

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     setCart(savedCart);

//     const total = savedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
//     setTotalPrice(total);

//     const savedWalletAddress = localStorage.getItem('walletAddress');
//     setWalletAddress(savedWalletAddress);
//   }, []);

//   const handleRemoveProduct = (id: string) => {
//     const updatedCart = cart.filter((product) => product.id !== id);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));

//     const total = updatedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
//     setTotalPrice(total);
//     setAlertMessage('Product removed from cart');
//     setOpenAlert(true);
//   };

//   const handleCloseAlert = () => {
//     setOpenAlert(false);
//   };

//   const handlePaymentClick = () => {
//     if (!walletAddress) {
//       setAlertMessage('Please connect your wallet first!');
//       setOpenAlert(true);
//       return;
//     }

//     if (cart.length === 0) {
//       setDialogMessage('Your cart is empty');
//     } else {
//       setDialogMessage(`Do you want to proceed with payment for a total of ${totalPrice} GITN?`);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmPayment = async () => {
//     if (!walletAddress) {
//       setAlertMessage('Please connect your wallet first!');
//       setOpenAlert(true);
//       return;
//     }

//     if (cart.length === 0) {
//       setAlertMessage('Your cart is empty');
//       setOpenAlert(true);
//       return;
//     }

//     try {
//       // Generate transaction payload for Jetton payment
//       const productOwnerAddress = cart[0]?.owner; // Address of the first product owner
//       const payload = new TextEncoder().encode(
//         JSON.stringify({
//           products: cart.map((product) => product.name).join(', '),
//           total: totalPrice,
//         })
//       );

//       // Construct the transaction for Jetton transfer
//       const transaction = {
//         validUntil: Math.floor(Date.now() / 1000) + 300, // Transaction expires in 5 minutes
//         messages: [
//           {
//             address: jettonMasterAddress, // Jetton Master address
//             amount: (totalPrice * 1e9).toString(), // Total amount to send in nano GITN
//             payload: payload.toString(), // Payload with transaction details
//           },
//           {
//             address: productOwnerAddress, // Product owner's address
//             amount: (totalPrice * 1e9).toString(), // Amount in nano GITN
//           },
//         ],
//       };

//       // Send the transaction through TonConnect
//       await tonConnectUI.sendTransaction(transaction);

//       // Success handling
//       setAlertMessage('Payment successful!');
//       setCart([]); // Clear cart after successful payment
//       localStorage.setItem('cart', '[]');
//     } catch (error: unknown) {
//       // Error handling
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//       setAlertMessage(`Payment failed: ${errorMessage}`);
//     }

//     setOpenAlert(true);
//     setOpenDialog(false);
//   };

//   return (
//     <div className={styles.wrapper}>
//       {/* Snackbar for alerts */}
//       <Snackbar
//         open={openAlert}
//         autoHideDuration={3000}
//         onClose={handleCloseAlert}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
//           {alertMessage}
//         </Alert>
//       </Snackbar>

//       {/* Dialog for payment confirmation */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Payment</DialogTitle>
//         <DialogContent>
//           <p>{dialogMessage}</p>
//         </DialogContent>
//         <DialogActions>
//           {cart.length > 0 && (
//             <Button onClick={handleConfirmPayment} color="primary" variant="contained">
//               Confirm
//             </Button>
//           )}
//           <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
//             {cart.length > 0 ? 'Cancel' : 'Close'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* TonConnect Button for wallet connection */}
//       <TonConnectButton />

//       <h1>Shopping Cart</h1>
//       <div className={styles.project}>
//         <div className={styles.shop}>
//           {cart.length === 0 ? (
//             <p>Your cart is empty</p>
//           ) : (
//             cart.map((product) => (
//               <div key={product.id} className={styles.box}>
//                 <Image src={product.image} alt={product.name} width={200} height={200} className="img" />
//                 <div className={styles.content}>
//                   <h3>{product.name}</h3>
//                   <h4>Price: {product.price} GITN</h4>
//                   <p className={styles.btnArea} onClick={() => handleRemoveProduct(product.id)}>
//                     Remove
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className={styles.rightBar}>
//           <p><span>Products</span> <span>{cart.length}</span></p>
//           <hr />
//           <p><span>Total</span> <span>{totalPrice} GITN</span></p>
//           <button className={styles.btnPayment} onClick={handlePaymentClick}>
//             Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

