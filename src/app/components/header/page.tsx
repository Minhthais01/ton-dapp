'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import BalanceUI from '../balance/page';
import SearchIcon from '@mui/icons-material/Search'; // Import MUI Search icon
import styles from './header.module.css';

const Header = () => {
  return (
    <TonConnectUIProvider manifestUrl='https://ton-dapp-two.vercel.app/tonconnect-manifest.json'>
      <header className={styles.header}>
        <div className={styles.logo}>My DApp</div>
        <nav className={styles.nav}>
          <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} /> {/* Use MUI Search icon */}
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
