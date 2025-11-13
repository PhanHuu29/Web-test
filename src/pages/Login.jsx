import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login data:', formData);
      // Handle login logic here
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Handle social login
  };

  return (
    <div className="login-page">
      {/* Background decorative elements */}
      <div className="bg-shapes">
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-text">ENGLISH</div>
        <div className="bg-text">TEST</div>
      </div>

      {/* Header */}
      <header className="login-header">
        <div className="header-content">
          <a href="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">EnglishTest <span>Pro</span></div>
          </a>
          <div className="language-selector">
            <button className="language-btn">
              <span className="flag">🇻🇳</span>
              <span>Tiếng Việt</span>
              <i className="fas fa-chevron-down" style={{fontSize: '12px'}}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <div className="login-card-header">
              <h1>Đăng nhập</h1>
              <p>Chào mừng bạn trở lại! Hãy đăng nhập để tiếp tục học tập</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email hoặc tên đăng nhập</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePassword}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-footer">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                </div>
                <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
              </div>

              <button type="submit" className={`btn-primary ${isLoading ? 'loading' : ''}`}>
                <span>Đăng nhập</span>
                <span className="spinner"></span>
              </button>
            </form>

            <div className="divider">hoặc đăng nhập với</div>

            <div className="social-login">
              <button className="social-btn google" onClick={() => handleSocialLogin('google')}>
                <i className="fab fa-google"></i>
                <span>Google</span>
              </button>
              <button className="social-btn facebook" onClick={() => handleSocialLogin('facebook')}>
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </button>
              <button className="social-btn apple" onClick={() => handleSocialLogin('apple')}>
                <i className="fab fa-apple"></i>
                <span>Apple</span>
              </button>
            </div>

            <div className="signup-prompt">
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
