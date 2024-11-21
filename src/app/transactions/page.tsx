// pages/transactions.tsx
import React from 'react';
import styles from './Transactions.module.css';

const Transactions = () => {
  const transactions = [
    { id: 1, name: 'CryptoPunk #1', price: 8, date: '2024-11-21', status: 'Completed' },
    { id: 2, name: 'CryptoPunk #2', price: 4, date: '2024-11-20', status: 'Pending' },
    { id: 3, name: 'CryptoPunk #3', price: 11, date: '2024-11-18', status: 'Completed' },
    { id: 4, name: 'CryptoPunk #4', price: 12, date: '2024-11-15', status: 'Failed' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.histitle}>Transaction History</h1>
        <div>
          <button className={styles.addButton}>Add New Transaction</button>
          <button className={styles.filterButton}>Filter</button>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHead}>Transaction ID</th>
              <th className={styles.tableHead}>NFT Name</th>
              <th className={styles.tableHead}>Price</th>
              <th className={styles.tableHead}>Date</th>
              <th className={styles.tableHead}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{transaction.id}</td>
                <td className={styles.tableCell}>{transaction.name}</td>
                <td className={styles.tableCell}>${transaction.price}</td>
                <td className={styles.tableCell}>{transaction.date}</td>
                <td className={styles.tableCell}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
