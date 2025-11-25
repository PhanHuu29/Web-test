import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TestNavigation.css';

const TestNavigation = ({ currentSection, completedSections = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sections = [
    {
      id: 'listening',
      name: 'Listening',
      icon: 'fa-headphones',
      path: `/test/${id}/listening`,
      color: '#3b82f6'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: 'fa-book-open',
      path: `/test/${id}/start`,
      color: '#10b981'
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: 'fa-pen',
      path: `/test/${id}/writing`,
      color: '#f59e0b'
    },
    {
      id: 'speaking',
      name: 'Speaking',
      icon: 'fa-microphone',
      path: `/test/${id}/speaking`,
      color: '#ef4444'
    }
  ];

  const currentIndex = sections.findIndex(s => s.id === currentSection);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      navigate(sections[currentIndex + 1].path);
    } else {
      // Chuyển đến trang kết quả khi hoàn thành tất cả
      navigate(`/test/${id}/results`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(sections[currentIndex - 1].path);
    }
  };

  const handleSectionClick = (section) => {
    navigate(section.path);
  };

  return (
    <div className="test-navigation">
      <div className="test-navigation-header">
        <button 
          className="nav-btn back-to-test"
          onClick={() => navigate(`/test/${id}`)}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại chi tiết bài test</span>
        </button>
        
        <div className="test-progress-bar">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className={`progress-step ${
                section.id === currentSection ? 'active' : ''
              } ${
                completedSections.includes(section.id) ? 'completed' : ''
              }`}
              onClick={() => handleSectionClick(section)}
              style={{ '--section-color': section.color }}
            >
              <div className="step-icon">
                <i className={`fas ${section.icon}`}></i>
                {completedSections.includes(section.id) && (
                  <i className="fas fa-check completed-check"></i>
                )}
              </div>
              <div className="step-label">{section.name}</div>
              {index < sections.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <button 
          className="nav-btn submit-test"
          onClick={() => navigate(`/test/${id}/results`)}
        >
          <i className="fas fa-flag-checkered"></i>
          <span>Nộp bài</span>
        </button>
      </div>

      <div className="test-navigation-controls">
        <button 
          className="control-btn prev-btn"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <i className="fas fa-chevron-left"></i>
          <span>Phần trước</span>
        </button>

        <div className="current-section-info">
          <i className={`fas ${sections[currentIndex]?.icon}`} style={{ color: sections[currentIndex]?.color }}></i>
          <span>{sections[currentIndex]?.name}</span>
        </div>

        <button 
          className="control-btn next-btn"
          onClick={handleNext}
        >
          <span>{currentIndex === sections.length - 1 ? 'Nộp bài' : 'Phần tiếp theo'}</span>
          <i className={`fas ${currentIndex === sections.length - 1 ? 'fa-check' : 'fa-chevron-right'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default TestNavigation;
