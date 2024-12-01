// pages/transaction-history.tsx
import React from 'react';
import styles from './history.module.css';  // Correctly import the CSS module

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: string;
  user: string;  // New field for user's name
  price: string; // New field for price
}

const TransactionHistory = () => {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 'TX12345',
      date: '2024-12-01',
      amount: '$50.00',
      status: 'Completed',
      user: 'John Doe',    // Example user
      price: '$50.00',     // Example price
    },
    {
      id: 'TX12346',
      date: '2024-12-02',
      amount: '$30.00',
      status: 'Pending',
      user: 'Jane Smith',  // Example user
      price: '$30.00',     // Example price
    },
    {
      id: 'TX12347',
      date: '2024-12-03',
      amount: '$100.00',
      status: 'Failed',
      user: 'Mark Lee',    // Example user
      price: '$100.00',    // Example price
    },
  ];

  return (
    <div className={styles['transaction-history']}>
      <h1 className={styles.tieude}>Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>Transaction ID</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Amount</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>User</th>   {/* New header for User */}
            <th className={styles.th}>Price</th>  {/* New header for Price */}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} className={styles.tr}>
                <td className={styles.td}>{transaction.id}</td>
                <td className={styles.td}>{transaction.date}</td>
                <td className={styles.td}>{transaction.amount}</td>
                <td className={styles.td}>{transaction.status}</td>
                <td className={styles.td}>{transaction.user}</td>  {/* Display user */}
                <td className={styles.td}>{transaction.price}</td> {/* Display price */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No transactions found.</td>  {/* Adjust colspan */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
