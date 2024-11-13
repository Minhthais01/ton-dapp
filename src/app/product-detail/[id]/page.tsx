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
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch('https://ton-dapp-two.vercel.app/db.json');
        if (!response.ok) {
          setError('Product not found');
          return;
        }
        const data = await response.json();
        const product = data.nfts.find((item: Product) => item.id.toString() === id);
        
        if (!product) {
          setError('Product not found');
        } else {
          setProduct(product);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      }
    };

    fetchProductDetails();
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
            <p className={styles.productPrice}>Auction Price: <span>{product.price} TON</span></p>
            <div className={styles.creatorInfo}>
              <p>Owner: <span>{product.owner}</span></p>
            </div>
            <button className={styles.openPopupBtn}>Buy NFT</button>
          </div>
        </div>
      </section>
    </div>
  );
}
