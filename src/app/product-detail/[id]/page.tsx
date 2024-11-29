'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './product-detail.module.css';  // Đảm bảo đường dẫn đúng đến file CSS của bạn
import { Snackbar, Alert } from '@mui/material';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'warning'>('success');

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://marketplace-on-ton-6xpf.onrender.com/products?sort=desc`);
        const data = await response.json();

        const productData = data.data.find((p: Product) => p.id === id);
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Failed to load product details. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      setAlertMessage('This product is already in your cart');
      setAlertSeverity('warning');
      setOpenAlert(true);
      return;
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAlertMessage('Product added to cart successfully');
    setAlertSeverity('success');
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.container}>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <section className={styles.productDetail}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <Image src={product.imageUrl} alt={product.name} width={400} height={400} />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: <span>{product.price} GITN</span></p>
            <button onClick={handleAddToCart} className={styles.openPopupBtn}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
