import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [activeView, setActiveView] = useState('grid');
  const [bookmarkedTests, setBookmarkedTests] = useState([1, 4]);
  const [activePage, setActivePage] = useState(1);

  const stats = [
    {
      label: 'Bài thi đã hoàn thành',
      value: '23',
      icon: 'fas fa-clipboard-check',
      color: 'blue',
      trend: '+3 từ tuần trước',
      trendUp: true
    },
    {
      label: 'Điểm trung bình',
      value: '7.5/10',
      icon: 'fas fa-star',
      color: 'green',
      trend: '+0.5 điểm',
      trendUp: true
    },
    {
      label: 'Thời gian học',
      value: '45h',
      icon: 'fas fa-clock',
      color: 'amber',
      trend: '+8h tuần này',
      trendUp: true
    },
    {
      label: 'Mục tiêu tiếp theo',
      value: 'IELTS 8.0',
      icon: 'fas fa-trophy',
      color: 'purple',
      progress: 65
    }
  ];

  const filters = ['Tất cả', 'IELTS', 'TOEFL', 'Business', 'Academic'];

  const tests = [
    {
      id: 1,
      title: 'IELTS Academic Practice Test - Full Test',
      difficulty: 'Intermediate',
      duration: '180 phút',
      rating: 4.8,
      reviewCount: 1234,
      thumbnail: 'https://storage.googleapis.com/forge-sites/e5df5c44acb097e7d96ce9904ad206cdc79d9141c0886139face04e195ed74ee.webp',
      category: 'ielts',
      featured: true,
      recommended: true,
      skills: ['listening', 'reading', 'writing', 'speaking']
    },
    {
      id: 2,
      title: 'TOEFL iBT Reading & Listening',
      difficulty: 'Intermediate',
      duration: '120 phút',
      thumbnail: 'https://storage.googleapis.com/forge-sites/a24d1889f75ec0af121fe9a65fbb607193d0c29b4ff350dfe714efe3ab906a95.webp',
      category: 'toefl',
      skills: ['listening', 'reading']
    },
    {
      id: 3,
      title: 'Business English Communication',
      difficulty: 'Advanced',
      duration: '90 phút',
      thumbnail: 'https://storage.googleapis.com/forge-sites/cf1101c7e10dafa54fb6dd9835f62b7ebbf4c2398cf3c7b7afe6ff94e54ad8c4.webp',
      category: 'business',
      skills: ['listening', 'reading', 'writing']
    },
    {
      id: 4,
      title: 'Academic Writing Skills Test',
      difficulty: 'Intermediate',
      duration: '60 phút',
      thumbnail: 'https://storage.googleapis.com/forge-sites/27d5691f6e27cc7e7b42051feefa3a937fe30dd30c04caf9a269548732ee802a.webp',
      category: 'academic',
      skills: ['reading', 'writing']
    },
    {
      id: 5,
      title: 'IELTS Speaking Mock Test',
      difficulty: 'Beginner',
      duration: '15 phút',
      thumbnail: 'https://storage.googleapis.com/forge-sites/0226e5649d79dddeb45f54ef6cf8cccb12db1dc306c9993d6dcb8f6b0a07a161.webp',
      category: 'ielts',
      skills: ['speaking']
    },
    {
      id: 6,
      title: 'General English Proficiency',
      difficulty: 'Beginner',
      duration: '45 phút',
      thumbnail: 'https://storage.googleapis.com/forge-sites/fd473f5067da05de18167d97d762bd2787bf080003d14e8aa9c869763587af62.webp',
      category: 'toefl',
      skills: ['listening', 'reading']
    }
  ];

  const recentTests = [
    { id: 1, title: 'IELTS Academic Reading', date: '2 ngày trước', score: '8.0/10' },
    { id: 2, title: 'TOEFL Listening Practice', date: '5 ngày trước', score: '7.5/10' },
    { id: 3, title: 'Business English Writing', date: '1 tuần trước', score: '6.5/10' }
  ];

  const weeklyGoal = {
    percentage: 65,
    completed: 13,
    total: 20,
    studyHours: 8,
    targetHours: 15,
    currentScore: 7.5,
    targetScore: 8.0
  };

  useEffect(() => {
    // Animate progress ring
    const progressCircle = document.querySelector('.progress-ring-circle-progress');
    if (progressCircle) {
      const circumference = 2 * Math.PI * 70;
      const offset = circumference - (weeklyGoal.percentage / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }, []);

  const toggleBookmark = (testId, e) => {
    e.stopPropagation();
    setBookmarkedTests(prev =>
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const handleTestClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  const handleStartTest = (testId, e) => {
    e.stopPropagation();
    navigate(`/test/${testId}/start`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'easy';
      case 'Intermediate': return 'medium';
      case 'Advanced': return 'hard';
      default: return 'medium';
    }
  };

  const getSkillIcon = (skill) => {
    switch (skill) {
      case 'listening': return 'fa-headphones';
      case 'reading': return 'fa-book-open';
      case 'writing': return 'fa-pen';
      case 'speaking': return 'fa-microphone';
      default: return 'fa-file';
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header>
        <div className="header-content">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">EnglishTest <span>Pro</span></div>
          </a>

          <nav>
            <ul className="nav-menu">
              <li><a href="#" className="active" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Bài thi</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Luyện tập</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Kết quả</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Khóa học</a></li>
            </ul>
          </nav>

          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Tìm kiếm bài test..." />
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge"></span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">NA</div>
              <div className="user-info">
                <div className="user-name">Nguyen Van A</div>
                <div className="user-role">Premium Member</div>
              </div>
              <i className="fas fa-chevron-down" style={{ color: '#94a3b8', fontSize: '12px' }}></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="main-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-content">
              <h1>Xin chào, Nguyen Van A! 👋</h1>
              <p>"Success is the sum of small efforts repeated day in and day out."</p>
            </div>
            <div className="streak-display">
              <div className="streak-icon">🔥</div>
              <div className="streak-info">
                <div className="streak-number">7 ngày</div>
                <div className="streak-label">Streak hiện tại</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <span className="stat-label">{stat.label}</span>
                  <div className={`stat-icon ${stat.color}`}>
                    <i className={stat.icon}></i>
                  </div>
                </div>
                <div className="stat-value">{stat.value}</div>
                {stat.trend && (
                  <div className={`stat-trend ${stat.trendUp ? '' : 'negative'}`}>
                    <i className={`fas fa-arrow-${stat.trendUp ? 'up' : 'down'}`}></i>
                    <span>{stat.trend}</span>
                  </div>
                )}
                {stat.progress !== undefined && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${stat.progress}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-header">
              <h2>Chọn bài test của bạn</h2>
              <div className="view-toggle">
                <button
                  className={`view-btn ${activeView === 'grid' ? 'active' : ''}`}
                  onClick={() => setActiveView('grid')}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
                  onClick={() => setActiveView('list')}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>

            <div className="filter-controls">
              <div className="filter-pills">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="filter-dropdown">
                <button className="dropdown-btn">
                  <i className="fas fa-signal"></i>
                  <span>Độ khó</span>
                  <i className="fas fa-chevron-down" style={{ fontSize: '12px' }}></i>
                </button>
              </div>

              <div className="filter-dropdown">
                <button className="dropdown-btn">
                  <i className="fas fa-clock"></i>
                  <span>Thời lượng</span>
                  <i className="fas fa-chevron-down" style={{ fontSize: '12px' }}></i>
                </button>
              </div>

              <div className="filter-dropdown">
                <button className="dropdown-btn">
                  <i className="fas fa-filter"></i>
                  <span>Kỹ năng</span>
                  <i className="fas fa-chevron-down" style={{ fontSize: '12px' }}></i>
                </button>
              </div>
            </div>
          </div>

          {/* Test Grid */}
          <div className="test-grid">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`test-card ${test.featured ? 'featured' : ''}`}
                onClick={() => handleTestClick(test.id)}
              >
                <div className={`test-thumbnail ${test.category}`}>
                  {test.recommended && (
                    <span className="test-badge recommended">Đề xuất cho bạn</span>
                  )}
                  <button
                    className={`bookmark-btn ${bookmarkedTests.includes(test.id) ? 'active' : ''}`}
                    onClick={(e) => toggleBookmark(test.id, e)}
                  >
                    <i className={bookmarkedTests.includes(test.id) ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
                  </button>
                  <img src={test.thumbnail} alt={test.title} />
                </div>
                <div className="test-content">
                  <div className="test-header">
                    <h3 className="test-title">{test.title}</h3>
                    <div className="test-meta">
                      <span className={`difficulty-badge ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </span>
                      <span className="test-duration">
                        <i className="fas fa-clock"></i>
                        {test.duration}
                      </span>
                      {test.rating && (
                        <span className="test-rating">
                          <i className="fas fa-star"></i>
                          {test.rating} ({test.reviewCount})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="skill-icons">
                    {['listening', 'reading', 'writing', 'speaking'].map((skill) => (
                      <div
                        key={skill}
                        className={`skill-icon ${test.skills.includes(skill) ? 'active' : ''}`}
                        title={skill.charAt(0).toUpperCase() + skill.slice(1)}
                      >
                        <i className={`fas ${getSkillIcon(skill)}`}></i>
                        {test.skills.includes(skill) && (
                          <span className="checkmark">
                            <i className="fas fa-check"></i>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="test-actions">
                    <button className="btn-start" onClick={(e) => handleStartTest(test.id, e)}>
                      <span>Bắt đầu test</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                    {test.featured && (
                      <button className="btn-preview" onClick={(e) => { e.stopPropagation(); }}>
                        <i className="fas fa-eye"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled={activePage === 1}>
              <i className="fas fa-chevron-left"></i>
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`page-btn ${activePage === page ? 'active' : ''}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
            <button className="page-btn" disabled={activePage === 5}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Recent Tests */}
          <div className="sidebar-card">
            <div className="sidebar-header">
              <i className="fas fa-history"></i>
              Lịch sử gần đây
            </div>

            {recentTests.map((test) => (
              <div key={test.id} className="recent-test" onClick={() => handleTestClick(test.id)}>
                <div className="recent-test-title">{test.title}</div>
                <div className="recent-test-meta">
                  <span>{test.date}</span>
                  <span className="recent-test-score">{test.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Goals */}
          <div className="sidebar-card">
            <div className="sidebar-header">
              <i className="fas fa-bullseye"></i>
              Mục tiêu tuần này
            </div>

            <div className="goal-chart">
              <div className="progress-ring">
                <svg width="160" height="160">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <circle className="progress-ring-circle" cx="80" cy="80" r="70" />
                  <circle
                    className="progress-ring-circle-progress"
                    cx="80"
                    cy="80"
                    r="70"
                    strokeDasharray="440"
                    strokeDashoffset="154"
                  />
                </svg>
                <div className="progress-ring-text">
                  <div className="progress-percentage">{weeklyGoal.percentage}%</div>
                  <div className="progress-label">Hoàn thành</div>
                </div>
              </div>

              <div className="goal-details">
                <div className="goal-item">
                  <span className="goal-item-label">Bài thi hoàn thành</span>
                  <span className="goal-item-value">{weeklyGoal.completed}/{weeklyGoal.total}</span>
                </div>
                <div className="goal-item">
                  <span className="goal-item-label">Thời gian học</span>
                  <span className="goal-item-value">{weeklyGoal.studyHours}h/{weeklyGoal.targetHours}h</span>
                </div>
                <div className="goal-item">
                  <span className="goal-item-label">Điểm mục tiêu</span>
                  <span className="goal-item-value">{weeklyGoal.currentScore}/{weeklyGoal.targetScore}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
