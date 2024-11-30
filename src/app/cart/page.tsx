'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cart.module.css';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

interface Product {
  id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  amount: number;
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://marketplace-on-ton-6xpf.onrender.com/cart');
        const data = await response.json();
        setCart(data.items);
        setTotalPrice(data.totalAmount);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveProduct = async (id: string) => {
    try {
      // Update the cart locally first
      const updatedCart = cart.filter((product) => product.id !== id);
      setCart(updatedCart);

      const updatedTotal = updatedCart.reduce((sum, product) => sum + product.product_price * product.amount, 0);
      setTotalPrice(updatedTotal);

      // Optionally send a delete request to the server if supported
      // await fetch(`https://marketplace-on-ton-6xpf.onrender.com/cart/${id}`, { method: 'DELETE' });

      setAlertMessage('Product removed from cart');
      setOpenAlert(true);
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className={styles.wrapper}>
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

      <h1>Shopping Cart</h1>
      <div className={styles.project}>
        <div className={styles.shop}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((product) => (
              <div key={product.id} className={styles.box}>
                <Image
                  src={`https://marketplace-on-ton-6xpf.onrender.com/images/${product.product_image}`}
                  alt={product.product_name}
                  width={200}
                  height={200}
                  className="img"
                />
                <div className={styles.content}>
                  <h3>{product.product_name}</h3>
                  <h4>Price: {product.product_price} GITN</h4>
                  <p>Quantity: {product.amount}</p>
                  <p className={styles.btnArea} onClick={() => handleRemoveProduct(product.id)}>
                    Remove
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.rightBar}>
          <p>
            <span>Products</span> <span>{cart.length}</span>
          </p>
          <hr />
          <p>
            <span>Total</span> <span>{totalPrice} GITN</span>
          </p>
          <button className={styles.btnPayment}>Payment</button>
        </div>
      </div>
    </div>
  );
}
