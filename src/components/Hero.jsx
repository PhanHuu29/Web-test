import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-pattern">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </div>
      
      <div className="hero-content">
        <div className="hero-grid">
          <div className="hero-text">
            <h1>Nâng cao trình độ tiếng Anh của bạn</h1>
            <p>
              Học tiếng Anh hiệu quả với hàng ngàn bài tập và đề thi thực tế. 
              Theo dõi tiến độ học tập và nhận chứng chỉ sau khi hoàn thành.
            </p>
            
            <div className="hero-buttons">
              <button className="btn-large primary">
                <i className="fas fa-play"></i>
                Bắt đầu ngay
              </button>
              <button className="btn-large secondary">
                <i className="fas fa-book"></i>
                Xem demo
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Học viên</div>
              </div>
              <div className="stat">
                <div className="stat-number">1,000+</div>
                <div className="stat-label">Đề thi</div>
              </div>
              <div className="stat">
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Đánh giá</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="skill-badges">
                <div className="skill-badge">
                  <div className="skill-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div className="skill-info">
                    <h4>Reading</h4>
                    <p>120 bài đọc</p>
                  </div>
                </div>
                <div className="skill-badge">
                  <div className="skill-icon">
                    <i className="fas fa-headphones"></i>
                  </div>
                  <div className="skill-info">
                    <h4>Listening</h4>
                    <p>85 bài nghe</p>
                  </div>
                </div>
                <div className="skill-badge">
                  <div className="skill-icon">
                    <i className="fas fa-pen"></i>
                  </div>
                  <div className="skill-info">
                    <h4>Writing</h4>
                    <p>50 bài viết</p>
                  </div>
                </div>
                <div className="skill-badge">
                  <div className="skill-icon">
                    <i className="fas fa-microphone"></i>
                  </div>
                  <div className="skill-info">
                    <h4>Speaking</h4>
                    <p>40 bài nói</p>
                  </div>
                </div>
              </div>
              
              {/* <div className="progress-info">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '68%'}}></div>
                </div>
                <div className="progress-header">
                  <span className="progress-label">Tiến độ học tập</span>
                  <span className="progress-percentage">68%</span>
                </div>
                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
