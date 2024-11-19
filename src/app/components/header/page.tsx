'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import BalanceUI from '../balance/page';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'; // Import MUI Menu icon
import CloseIcon from '@mui/icons-material/Close'; // Import MUI Close icon
import styles from './header.module.css';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        </nav>
      </header>
    </TonConnectUIProvider>
  );
};

export default Header;
