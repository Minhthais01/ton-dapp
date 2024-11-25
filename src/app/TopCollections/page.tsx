import React from "react";

import styles from "./Topcollections.module.css";

const TopCollection = () => {

  const collections = [
    { rank: 1, name: "Anonymous Telegram Numbers", floor: "227 TON", change: "+11%" },
    { rank: 2, name: "Telegram Usernames", floor: "4.65 TON", change: "-25%" },
    { rank: 3, name: "TON DNS Domains", floor: "0.7 TON", change: "+16%" },
    { rank: 4, name: "Crystals of Glarungs", floor: "5 TON", change: "+7%" },
    { rank: 5, name: "Gatto | Official NFT Storage", floor: "0.31 TON", change: "-4%" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.subHeading}>Top Collections</h2>
      <ul className={styles.collectionList}>
        {collections.map((col) => (
          <li key={col.rank} className={styles.collectionItem}>
            <span>#{col.rank} {col.name}</span>
            <span>Floor: {col.floor}</span>
            <span className={col.change.startsWith("+") ? styles.positive : styles.negative}>
              {col.change}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCollection;
