import React from 'react';
import '../styles/SocialProof.css';

const SocialProof = () => {
  return (
    <section className="social-proof">
      <div className="section-container">
        <div className="proof-card">
          <div className="proof-number">50,000+</div>
          <div className="proof-text">Học viên tin tưởng</div>
        </div>
        
        <div className="user-avatars">
          <div className="avatars-group">
            <div className="avatar">👨</div>
            <div className="avatar">👩</div>
            <div className="avatar">👨</div>
            <div className="avatar">👩</div>
            <div className="avatar">👨</div>
          </div>
          <div className="rating">
            <div className="stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <span className="rating-text">4.9/5 từ 12,000+ đánh giá</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
