'use client';

import { useState } from 'react';
import styles from './signin.module.css';
import { Google, Facebook, GitHub, LinkedIn } from '@mui/icons-material'; // Import các icon từ MUI

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault(); 

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://marketplace-on-ton-6xpf.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đăng ký không thành công');
      }

      const data = await response.json();
      console.log('Đăng ký thành công:', data);
      // Có thể thực hiện thêm các bước sau khi đăng ký thành công

    } catch (err: any) {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', err);
      setError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn reload trang khi form được submit

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://marketplace-on-ton-6xpf.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đăng nhập không thành công');
      }

      const data = await response.json();
      console.log('Đăng nhập thành công:', data);
      // Thực hiện các hành động sau khi đăng nhập thành công

    } catch (err: any) {
      console.error('Lỗi khi gửi yêu cầu đăng nhập:', err);
      setError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}><Google /></a>
              <a href="#" className={styles.icon}><Facebook /></a>
              <a href="#" className={styles.icon}><GitHub /></a>
              <a href="#" className={styles.icon}><LinkedIn /></a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading}>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}><Google /></a>
              <a href="#" className={styles.icon}><Facebook /></a>
              <a href="#" className={styles.icon}><GitHub /></a>
              <a href="#" className={styles.icon}><LinkedIn /></a>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <a href="#">Forgot Your Password?</a>
            <button type="submit" disabled={isLoading}>Sign In</button>
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
