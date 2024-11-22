'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './product-detail.module.css';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material'; // Import Snackbar để hiển thị thông báo

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  owner: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false); // state để quản lý việc mở/đóng alert
  const [alertMessage, setAlertMessage] = useState(''); // state để chứa thông báo
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'warning'>('success'); // Thêm trạng thái severity

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://ton-dapp-two.vercel.app/db.json`);
        if (!response.ok) {
          setError('Product not found');
          return;
        }
        const data = await response.json();
        const productData = data.nfts.find((p: Product) => p.id.toString() === id);

        if (productData) {
          setProduct(productData); 
        } else {
          setError('Product not found');
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching product details:', error);
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
      setAlertMessage('This product is already in your cart');  // Thông báo cảnh báo khi sản phẩm đã có trong giỏ hàng
      setAlertSeverity('warning'); // Sử dụng severity "warning"
      setOpenAlert(true);
      return;
    }
  
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAlertMessage('Product added to cart successfully'); // Thông báo khi sản phẩm được thêm vào giỏ hàng
    setAlertSeverity('success'); // Sử dụng severity "success"
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.container}>
      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000} // Thời gian hiển thị là 3 giây
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Hiển thị ở trên cùng, giữa màn hình
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <section className={styles.productDetail}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <Image src={product.image} alt={product.name} width={400} height={400} />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: <span>{product.price} GITN</span></p>
            <div className={styles.creatorInfo}>
              <p>Owner: <span>{product.owner}</span></p>
            </div>
            <button onClick={handleAddToCart} className={styles.addToCartBtn}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
