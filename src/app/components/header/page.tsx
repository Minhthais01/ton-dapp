'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import BalanceUI from '../balance/page';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import styles from './header.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart item count
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user's email
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown menu for logout

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

  // Cập nhật email ngay khi trang được load (hoặc khi có sự thay đổi về authToken)
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Lấy email từ localStorage khi có authToken
      const email = localStorage.getItem('userEmail');
      setUserEmail(email); // Cập nhật trực tiếp email vào state
    }
  }, []); // Chạy một lần khi component mount

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khi đăng xuất
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setUserEmail(null); // Đặt lại email trong state
    setIsDropdownOpen(false); // Đóng dropdown khi đăng xuất
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown khi nhấn vào email
  };

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

          {/* Hiển thị email người dùng khi đăng nhập */}
          {userEmail ? (
          <div className={styles.userInfo}>
            <span onClick={toggleDropdown} className={styles.userEmail}>{userEmail}</span>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
            <Link href="/signin">
              <p>Login</p>
            </Link>
          )}
        </nav>
      </header>
    </TonConnectUIProvider>
  );
};

export default Header;
