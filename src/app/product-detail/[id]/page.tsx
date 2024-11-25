'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './product-detail.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  owner: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params; // Lấy id từ params

  const [product, setProduct] = useState<Product | null>(null); // Dữ liệu sản phẩm
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái mở popup
  const [error, setError] = useState<string | null>(null); 

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    if (!id) return;

    // Hàm lấy dữ liệu sản phẩm từ API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://marketplace-on-ton-6xpf.onrender.com/products`);
        if (!response.ok) {
          setError('Product not found');
          return;
        }
        const data = await response.json();

        // Tìm sản phẩm có id khớp với params id
        const productData = data.data.find((p: Product) => p.id === id);

        if (productData) {
          // Cập nhật state với dữ liệu sản phẩm
          setProduct({
            ...productData,
            price: Number(productData.price), // Chuyển giá thành number
          });
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.container}>
      <section className={styles.productDetail}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            {/* Sử dụng Image từ Next.js */}
         
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: <span>{product.price} GITN</span></p>
            <div className={styles.creatorInfo}>
              <p>Owner: <span>{product.owner}</span></p>
            </div>
            <button className={styles.openPopupBtn} onClick={openPopup}>Buy NFT</button>
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <h2>Buy NFT</h2>
              <span className={styles.closeBtn} onClick={closePopup}>&times;</span>
            </div>

            <div className={styles.nftPopupBody}>
              <div className={styles.nftHeader}>
                <Image className={styles.nftImage} src={`https://ton-dapp-two.vercel.app/storage/${product.image}`} alt={product.name} width={80} height={80} />
                <div className={styles.nftTitleGroup}>
                  <h2 className={styles.nftTitle}>{product.name}</h2>
                  <h3 className={styles.nftSubtitle}>{product.owner}</h3>
                </div>
              </div>

              <div className={styles.priceDetails}>
                <div className={styles.nftPrice}>
                  <span className={styles.priceLabel}>NFT Price</span>
                  <span className={styles.priceValueRight}><strong>{product.price}</strong> GITN</span>
                </div>
                <span className={styles.priceInfo}>The rest will be returned to your wallet</span>
              </div>

              <div className={styles.nftActions}>
                <button className={styles.buyBtn}>Buy for {product.price} GITN</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
