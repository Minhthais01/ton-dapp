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
  const { id } = params; // Truy xuất trực tiếp id từ params
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

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
          setProduct(productData); // Update state with the fetched data
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

  if (error) return <p>{error}</p>;

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.container}>
      <section className={styles.productDetail}>
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <Image src={product.image} alt={product.name} width={400} height={400} />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Auction Price: <span>{product.price} GITN</span></p>
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
                <Image className={styles.nftImage} src={product.image} alt={product.name} width={80} height={80} />
                <div className={styles.nftTitleGroup}>
                  <h2 className={styles.nftTitle}>{product.name}</h2>
                  <h3 className={styles.nftSubtitle}>{product.owner}</h3>
                </div>
              </div>

              <div className={styles.priceDetails}>
                <div className={styles.nftPrice}>
                  <span className={styles.priceLabel}>NFT Price</span>
                  <span className={styles.priceValueRight}><strong>{product.price}</strong> TON</span>
                </div>
                <div className={styles.networkFee}>
                  <span className={styles.priceLabel}>Network Fee</span>
                  <span className={styles.priceValueRight}><strong>0.3</strong> TON</span>
                </div>
                <span className={styles.priceInfo}>The rest will be returned to your wallet</span>
              </div>

              <div className={styles.nftActions}>
                <button className={styles.buyBtn}>Buy for {parseFloat(product.price) + 0.3} TON</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
