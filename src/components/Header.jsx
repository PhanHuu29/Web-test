import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="header-content">
        <a href="/" className="logo">
          <div className="logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="logo-text">
            English<span>Test</span> Pro
          </div>
        </a>
        
        <nav>
          <ul className="nav-links">
            <li><a href="#features" className="active">Tính năng</a></li>
            <li><a href="#tests">Đề thi</a></li>
            <li><a href="#practice">Luyện tập</a></li>
            <li><a href="#achievements">Thành tích</a></li>
            <li><a href="#about">Về chúng tôi</a></li>
          </ul>
          
          <div className="auth-buttons">
            <button className="btn-secondary" onClick={() => navigate('/login')}>Đăng nhập</button>
            <button className="btn-primary" onClick={() => navigate('/register')}>Đăng ký</button>
          </div>
        </nav>

        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
