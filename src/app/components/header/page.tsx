'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import BalanceUI from '../balance/page';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'; // Import MUI Menu icon
import CloseIcon from '@mui/icons-material/Close'; // Import MUI Close icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import ShoppingCart icon
import { Badge, IconButton } from '@mui/material'; // Import Badge and IconButton from Material UI
import styles from './header.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart item count

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.length);
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng khi trang được tải hoặc có thay đổi
  useEffect(() => {
    // Cập nhật số lượng sản phẩm ban đầu
    updateCartItemCount();

    // Lắng nghe sự thay đổi trong localStorage trong cùng một tab (khi dữ liệu thay đổi)
    const interval = setInterval(updateCartItemCount, 1000); // Kiểm tra và cập nhật mỗi giây

    // Cleanup: Dừng việc kiểm tra khi component bị unmount
    return () => clearInterval(interval);
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <TonConnectUIProvider manifestUrl='https://ton-dapp-two.vercel.app/tonconnect-manifest.json'>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href={`/product`}>GITN</Link>
        </div>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <div className={styles.searchBar}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Name or description"
              className={styles.searchInput}
            />
          </div>
          
          <TonConnectButton className={styles.connectButton} />
          <BalanceUI />
          {/* Thêm IconButton giỏ hàng */}
          <Link href="/cart">
            <IconButton aria-label="cart">
              <Badge badgeContent={cartItemCount} color="secondary" invisible={cartItemCount === 0}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link href="/signin">
          <p>Login</p>
          </Link>
        </nav>
      </header>
    </TonConnectUIProvider>
  );
};

export default Header;