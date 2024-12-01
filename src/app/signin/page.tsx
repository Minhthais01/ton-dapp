'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';
import { Google, Facebook, GitHub, LinkedIn } from '@mui/icons-material';

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail); // Nếu có email trong localStorage, hiển thị email người dùng
    }
  }, []);

  // Hàm chuyển tab giữa đăng nhập và đăng ký
  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  // Hàm cập nhật giá trị input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Hàm xử lý đăng ký
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Kiểm tra nếu mật khẩu khớp
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
  
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      });
  
      const data = await response.json();
  
      // Kiểm tra mã trạng thái HTTP của phản hồi
      if (response.status === 200) {
        alert('Registration successful!');
        router.push('/signin'); // Chuyển hướng sau khi đăng ký thành công
      } else if (response.status === 409) {
        // Email đã tồn tại
        alert('This email is already registered. Please use another one.');
      } else {
        // Các lỗi khác
        const errorMessage = data?.message || 'Registration failed!';
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  // Hàm xử lý đăng nhập
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
      console.log('Login Response:', data);  // Log phản hồi API

      useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        console.log('Stored email from localStorage:', storedEmail);  // Kiểm tra lại giá trị email
        if (storedEmail) {
          setUserEmail(storedEmail);  // Cập nhật lại userEmail
        }
      }, []);

      if (!response.ok) {
        // Nếu không thành công, hiển thị thông báo lỗi từ API trong alert
        alert(data?.message || 'Login failed!');
        return;
      }

      // Kiểm tra nếu data là một đối tượng chứa token
      if (data && data.token) {
        const token = typeof data.token === 'string' ? data.token : JSON.stringify(data.token);
        localStorage.setItem('authToken', token);
        alert('Login successful!');
        router.push('/product');  // Chuyển hướng đến trang sản phẩm
      } else {
        alert('Login failed! Token missing.');
      }
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('There was an error signing in. Please try again later.');
    }
  };
  
  return (
    <div className={styles.body}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
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
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
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
