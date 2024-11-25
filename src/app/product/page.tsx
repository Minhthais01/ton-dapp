"use client";
import { useState, useEffect } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product.module.css';

type Product = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  price: number;
  directus_files: {
    filename_disk: string;
  };
};

type ProductResponse = {
  data: Product[];
};

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortOrder, setSortOrder] = useState('low-high');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://marketplace-on-ton-6xpf.onrender.com/products?sort=desc`);
        const result: ProductResponse = await response.json();

        // Map API data to our Product type
        const products = result.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: Number(product.price), // Ensure price is a number
          image: product.directus_files.filename_disk, // Assuming you want to get the image URL from here
          description: product.description,
        }));

        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to sort products by price
  const sortProducts = (products: Product[]) => {
    if (sortOrder === 'low-high') {
      return products.sort((a, b) => a.price - b.price); // Sort ascending
    } else {
      return products.sort((a, b) => b.price - a.price); // Sort descending
    }
  };

  // Function to filter products based on search and price range
  const getFilteredProducts = () => {
    let filtered = filteredProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice !== '' || maxPrice !== '') {
      filtered = filtered.filter((product) => {
        const productPrice = product.price;  // Ensure price is a number
        const matchesMinPrice = minPrice ? productPrice >= minPrice : true;
        const matchesMaxPrice = maxPrice ? productPrice <= maxPrice : true;
        return matchesMinPrice && matchesMaxPrice;
      });
    }

    // Sort the filtered products
    return sortProducts(filtered);
  };

  const toggleFilter = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <label onClick={toggleFilter} className={styles.label}>
        {isOpen ? <CancelIcon className={styles.closeBtn} fontSize="small" /> : <FilterAltIcon className={styles.filterBtn} fontSize="small" />}
      </label>

      <div className={`${styles.sidenav} ${isOpen ? styles.show : ''}`}>
        <p className={styles.heading}>Filter</p>
        <div className={styles.searchBar}>
          <form className={styles.searchBar_form} action="#">
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className={styles.searchIcon} fontSize="medium" />
          </form>
        </div>
        <div className={styles.iconItems}>
          <p className={styles.sort_by}>Sort by</p>
          <ul>
            <li>
              <select
                id="sort"
                className={styles.sortDropdown}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </li>
          </ul>
        </div>

        <div className={styles.priceRange}>
          <p className={styles.price_Range}>Price Range</p>
          <div className={styles.priceInputs}>
            <input
              type="number"
              placeholder="From"
              className={styles.priceFrom}
              value={minPrice === '' ? '' : minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
            />
            <input
              type="number"
              placeholder="To"
              className={styles.priceTo}
              value={maxPrice === '' ? '' : maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      </div>

      <div className={`${styles.mainContent} ${isOpen ? styles.shift : ''}`}>
        <div className={styles.wrapper}>
          {/* Hiển thị thông báo không có sản phẩm */}
          {getFilteredProducts().length === 0 ? (
            <p>No products available</p>
          ) : (
            getFilteredProducts().map((product) => (
              <div key={product.id} className={styles.singleCard}>
                <div className={styles.imgArea}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={300}
                    className={styles.img}
                    unoptimized
                  />
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
          )}
        </div>
      </div>
    </div>
  );
}
