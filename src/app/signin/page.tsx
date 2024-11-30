'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import { Google, Facebook, GitHub, LinkedIn } from '@mui/icons-material';

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userEmail, setUserEmail] = useState<string | null>(null); // Lưu email người dùng sau khi đăng nhập
  const router = useRouter();

  // Kiểm tra xem người dùng đã đăng nhập hay chưa khi load trang
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail); // Nếu có email trong localStorage, hiển thị email người dùng
    }
  }, []); // Chạy một lần khi component mount

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        // Sau khi đăng ký thành công, chuyển hướng về trang sản phẩm
        router.push('/signin');
      } else {
        alert(data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', formData.email); // Lưu email vào localStorage
        setUserEmail(formData.email); // Cập nhật email vào state để hiển thị trên giao diện
        alert('Login successful!');
        
        // Dùng router.replace để tải lại trang sản phẩm mà không có lịch sử trình duyệt
        router.push('/product'); 
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  };
  

  return (
    <div className={styles.body}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
        {/* Các form đăng nhập và đăng ký */}
        <>
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
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Sign Up</button>
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
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <a href="#">Forgot Your Password?</a>
              <button type="submit">Sign In</button>
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
        </>
      </div>
    </div>
  );
};

export default SignIn;
