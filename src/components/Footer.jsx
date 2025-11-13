import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="footer-logo-text">
                English<span>Test</span> Pro
              </div>
            </div>
            <p className="footer-description">
              Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Sản phẩm</h4>
            <ul className="footer-links">
              <li><a href="#features">Tính năng</a></li>
              <li><a href="#tests">Đề thi</a></li>
              <li><a href="#practice">Luyện tập</a></li>
              <li><a href="#pricing">Bảng giá</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Công ty</h4>
            <ul className="footer-links">
              <li><a href="#about">Về chúng tôi</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Tuyển dụng</a></li>
              <li><a href="#contact">Liên hệ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Hỗ trợ</h4>
            <ul className="footer-links">
              <li><a href="#help">Trung tâm trợ giúp</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#terms">Điều khoản</a></li>
              <li><a href="#privacy">Chính sách</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 EnglishTest Pro. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#terms">Điều khoản</a>
            <a href="#privacy">Chính sách</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
