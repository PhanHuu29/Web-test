import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-brain',
      title: 'AI Thông minh',
      description: 'Hệ thống AI phân tích và đề xuất bài tập phù hợp với trình độ của bạn'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Theo dõi tiến độ',
      description: 'Xem chi tiết quá trình học tập và cải thiện từng kỹ năng'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Chứng chỉ uy tín',
      description: 'Nhận chứng chỉ sau khi hoàn thành khóa học để nâng cao CV'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="section-container">
        <div className="section-header">
          <div className="section-subtitle">Tại sao chọn chúng tôi</div>
          <h2 className="section-title">Tính năng nổi bật</h2>
          <p className="section-description">
            Trải nghiệm học tiếng Anh hiện đại với công nghệ AI tiên tiến
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
