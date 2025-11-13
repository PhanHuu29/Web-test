import React, { useState, useEffect } from 'react';
import '../styles/TestPreview.css';

const TestPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const tests = [
    {
      title: 'TOEIC Practice Test #1',
      difficulty: 'beginner',
      difficultyText: 'Cơ bản',
      duration: '120 phút',
      questions: '200 câu',
      skills: ['Reading', 'Listening'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'IELTS Reading Practice',
      difficulty: 'intermediate',
      difficultyText: 'Trung bình',
      duration: '60 phút',
      questions: '40 câu',
      skills: ['Reading', 'Vocabulary'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Business English Advanced',
      difficulty: 'advanced',
      difficultyText: 'Nâng cao',
      duration: '90 phút',
      questions: '50 câu',
      skills: ['Speaking', 'Writing'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Grammar Fundamentals',
      difficulty: 'beginner',
      difficultyText: 'Cơ bản',
      duration: '45 phút',
      questions: '30 câu',
      skills: ['Grammar', 'Writing'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tests.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tests.length]);

  const updateCarousel = (index) => {
    setCurrentSlide(index);
    const carousel = document.getElementById('testCarousel');
    if (carousel) {
      const cardWidth = carousel.querySelector('.test-card').offsetWidth;
      const gap = 24;
      carousel.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="test-preview" id="tests">
      <div className="section-container">
        <div className="section-header">
          <div className="section-subtitle">Đề thi mẫu</div>
          <h2 className="section-title">Khám phá đề thi</h2>
          <p className="section-description">
            Hàng trăm đề thi được cập nhật liên tục
          </p>
        </div>
        
        <div className="carousel-container">
          <div className="carousel-wrapper" id="testCarousel">
            {tests.map((test, index) => (
              <div className="test-card" key={index}>
                <div className="test-thumbnail" style={{background: test.gradient}}>
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="test-info">
                  <div className="test-header">
                    <h3 className="test-title">{test.title}</h3>
                    <span className={`difficulty-badge ${test.difficulty}`}>
                      {test.difficultyText}
                    </span>
                  </div>
                  <div className="test-meta">
                    <span className="test-meta-item">
                      <i className="fas fa-clock"></i> {test.duration}
                    </span>
                    <span className="test-meta-item">
                      <i className="fas fa-question-circle"></i> {test.questions}
                    </span>
                  </div>
                  <div className="test-skills">
                    {test.skills.map((skill, i) => (
                      <span className="skill-tag" key={i}>{skill}</span>
                    ))}
                  </div>
                  <button className="test-card-cta">
                    Bắt đầu làm bài <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-nav">
            {tests.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => updateCarousel(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestPreview;
