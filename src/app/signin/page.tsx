// app/sign-up-sign-in/page.tsx
'use client';

import { useState } from 'react';
import styles from './signin.module.css';
import { Google, Facebook, GitHub, LinkedIn } from '@mui/icons-material'; // Import các icon từ MUI

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}><Google /></a> {/* Thay thế bằng icon Google */}
              <a href="#" className={styles.icon}><Facebook /></a> {/* Thay thế bằng icon Facebook */}
              <a href="#" className={styles.icon}><GitHub /></a> {/* Thay thế bằng icon GitHub */}
              <a href="#" className={styles.icon}><LinkedIn /></a> {/* Thay thế bằng icon LinkedIn */}
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}><Google /></a> {/* Thay thế bằng icon Google */}
              <a href="#" className={styles.icon}><Facebook /></a> {/* Thay thế bằng icon Facebook */}
              <a href="#" className={styles.icon}><GitHub /></a> {/* Thay thế bằng icon GitHub */}
              <a href="#" className={styles.icon}><LinkedIn /></a> {/* Thay thế bằng icon LinkedIn */}
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={styles.hidden} onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className={styles.hidden} onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
