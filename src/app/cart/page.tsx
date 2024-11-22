'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cart.module.css';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material'; // Import Snackbar để hiển thị thông báo

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openAlert, setOpenAlert] = useState(false); // state để quản lý việc mở/đóng alert
  const [alertMessage, setAlertMessage] = useState(''); // state để chứa thông báo

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    const total = savedCart.reduce((sum: number, product: Product) => sum + parseFloat(product.price), 0);
    setTotalPrice(total);
  }, []);

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

  return (
    <div className={styles.wrapper}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000} // Thời gian hiển thị là 3 giây
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Hiển thị ở trên cùng, giữa màn hình
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
          <button className={styles.btnPayment}>Payment</button>
        </div>
      </div>
    </div>
  );
}
