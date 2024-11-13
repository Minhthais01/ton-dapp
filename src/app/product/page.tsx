'use client';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product.module.css';

interface NFT {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
}

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => setIsOpen(!isOpen);

  const [products, setProducts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ton-dapp-two.vercel.app/db.json', {
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data && Array.isArray(data.nfts)) {
          setProducts(data.nfts);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <label onClick={toggleFilter} className={styles.label}>
        {isOpen ? <CancelIcon className={styles.closeBtn} fontSize="small" /> : <FilterAltIcon className={styles.filterBtn} fontSize="small" />}
      </label>

      <div className={`${styles.sidenav} ${isOpen ? styles.show : ''}`}>
        <p className={styles.heading}>Filter</p>
        <div className={styles.searchBar}>
          <form className={styles.searchBar_form} action="#">
            <input className={styles.searchInput} type="text" placeholder="Search..." />
            <SearchIcon className={styles.searchIcon} fontSize="medium" />
          </form>
        </div>
        <div className={styles.iconItems}>
          <p className={styles.sort_by}>Sort by</p>
          <ul>
            <li>
              <select id="sort" className={styles.sortDropdown}>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </li>
          </ul>
        </div>

        <div className={styles.priceRange}>
          <p className={styles.price_Range}>Price Range</p>
          <div className={styles.priceInputs}>
            <input type="number" placeholder="From" className={styles.priceFrom} />
            <input type="number" placeholder="To" className={styles.priceTo} />
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      </div>

      <div className={`${styles.mainContent} ${isOpen ? styles.shift : ''}`}>
        <div className={styles.wrapper}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.singleCard}>
                <div className={styles.imgArea}>
                  <Image src={product.image} alt={product.name} width={320} height={300} className={styles.img} unoptimized />
                  <div className={styles.overlay}>
                    <Link href={`/product-detail/${product.id}`} className={styles.addToCart}>
                      View Detail
                    </Link>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: {product.price} GITN</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}
