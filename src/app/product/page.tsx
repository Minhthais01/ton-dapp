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
}

export default function Product() {
  // filter state
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => setIsOpen(!isOpen);

  // product data state
  const [products, setProducts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetching the data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Ensure loading is true when fetching starts
      try {
        const response = await fetch('http://localhost:5000/nfts', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache', // Disable caching for fresh data
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Update state with the fetched data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error fetching products:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchProducts(); // Call the fetch function immediately on component mount
  }, []); // Only call on mount

  // Showing loading or error if needed
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <label onClick={toggleFilter} className={styles.label}>
        {isOpen ? (
          <CancelIcon className={styles.closeBtn} fontSize="small" />
        ) : (
          <FilterAltIcon className={styles.filterBtn} fontSize="small" />
        )}
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
        {/* Display products */}
        <div className={styles.wrapper}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.singleCard}>
                <div className={styles.imgArea}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={300}
                    className={styles.img}
                    unoptimized // Optional, if you don't need image optimization
                  />
                  <div className={styles.overlay}>
                    {/* Redirect to product detail */}
                    <Link href={`/product-detail/${product.id}`} className={styles.addToCart}>
                      View Detail
                    </Link>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
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
