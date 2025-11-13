import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/TestDetail.css';

function TestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [notesExpanded, setNotesExpanded] = useState(false);

  const testData = {
    id: 1,
    title: 'IELTS Academic Practice Test 2024',
    thumbnail: 'https://storage.googleapis.com/forge-sites/2f890942e9386da88e573bc4ad201ac5ea5d2b74c749a26444f1350c6374b5fc.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=164061697651-compute%40developer.gserviceaccount.com%2F20251107%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20251107T154716Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&response-access-control-allow-origin=https%3A%2F%2Fforge.moonchild.ai&X-Goog-Signature=82597c9f231984096a9d8bcf226979ba68f6824a6e61d59dce813017791b7f6473ba0b494156d1a0d1195b004d0c169400e405c5801d6a923043c2fade77c7c9be89a7ca8a2526b93a2c9ab59f248838223be44ccfb9ab806d6c81424af9520aeb2f2edc74c79434437cdd9bbfa4a8d3521fdd8afa3c7934733f5b416ea153fa54393d87106d191c5d2c23b39c6b4592991df9d94ad95c880819e87a501cae25c9bb6db03b809678795d8aca7e79af1e9bb7dbaff12ac743e8a7b11717a034d60008e499f1ca4df968b3c690491a387d48f3e4ffe5c0e3a471f19e4fa0b7829b4595af08d138d53da0382e9af491fd16cd3ddfea4fab1b111174f3fe0352ae79',
    difficulty: 'Intermediate',
    level: 'B2-C1',
    rating: 4.8,
    reviewCount: 342,
    attemptCount: 2847,
    duration: '165 phút',
    verified: true,
    description: 'Bài test thực hành IELTS Academic hoàn chỉnh với format chuẩn theo đúng quy định của British Council. Bài test bao gồm đầy đủ 4 kỹ năng: Listening, Reading, Writing và Speaking với độ khó tương đương kỳ thi thực tế. Được thiết kế bởi giáo viên có chứng chỉ IELTS 8.5 và kinh nghiệm giảng dạy 10 năm.',
    skills: [
      {
        id: 1,
        name: 'Listening',
        icon: 'fa-headphones',
        color: 'listening',
        time: '30 phút',
        details: {
          questions: '40 câu',
          parts: '4 phần',
          types: 'Multiple choice, Gap-fill, Matching',
          scoring: 'Band 0-9'
        }
      },
      {
        id: 2,
        name: 'Reading',
        icon: 'fa-book-open',
        color: 'reading',
        time: '60 phút',
        details: {
          questions: '40 câu',
          parts: '3 passages',
          types: 'True/False, Matching, Summary',
          scoring: 'Band 0-9'
        }
      },
      {
        id: 3,
        name: 'Writing',
        icon: 'fa-pen',
        color: 'writing',
        time: '60 phút',
        details: {
          questions: '2 tasks',
          task1: '150 từ (Report/Graph/Chart)',
          task2: '250 từ (Essay)',
          scoring: 'Band 0-9 (4 tiêu chí)'
        }
      },
      {
        id: 4,
        name: 'Speaking',
        icon: 'fa-microphone',
        color: 'speaking',
        time: '15 phút',
        details: {
          parts: '3 parts',
          part1: 'Introduction & Interview (4-5 phút)',
          part2: 'Long turn (3-4 phút)',
          part3: 'Discussion (4-5 phút)'
        }
      }
    ],
    requirements: [
      { icon: 'fa-volume-up', text: 'Môi trường yên tĩnh, không bị làm phiền' },
      { icon: 'fa-headphones', text: 'Tai nghe hoặc loa chất lượng tốt' },
      { icon: 'fa-clock', text: '165 phút không bị gián đoạn' },
      { icon: 'fa-wifi', text: 'Kết nối internet ổn định' }
    ],
    leaderboard: [
      { rank: 1, name: 'Trần Hoàng', avatar: 'TH', score: 8.5, date: '3 ngày trước', badge: 'gold' },
      { rank: 2, name: 'Lê Phương', avatar: 'LP', score: 8.0, date: '5 ngày trước', badge: 'silver' },
      { rank: 3, name: 'Nguyễn Hằng', avatar: 'NH', score: 7.5, date: '1 tuần trước', badge: 'bronze' },
      { rank: 4, name: 'Phạm Minh', avatar: 'PM', score: 7.5, date: '1 tuần trước', badge: 'other' },
      { rank: 5, name: 'Vũ Thảo', avatar: 'VT', score: 7.0, date: '2 tuần trước', badge: 'other' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Mai Hương',
        avatar: 'MH',
        rating: 5,
        date: '2 ngày trước',
        text: 'Bài test rất chất lượng, format giống 100% với bài thi thật. Phần listening audio rất rõ ràng, reading passages có độ khó vừa phải. Đặc biệt là phần chấm writing rất chi tiết, giúp mình biết được lỗi sai cụ thể. Rất recommend cho ai đang luyện thi IELTS!'
      },
      {
        id: 2,
        name: 'Quang Anh',
        avatar: 'QA',
        rating: 4,
        date: '5 ngày trước',
        text: 'Bài test hay, câu hỏi đa dạng. Tuy nhiên mình thấy phần speaking hơi khó so với level intermediate. Nhưng nhìn chung là bài test rất tốt để luyện tập, giao diện dễ sử dụng và có timer rất tiện.'
      },
      {
        id: 3,
        name: 'Thùy Linh',
        avatar: 'TL',
        rating: 5,
        date: '1 tuần trước',
        text: 'Excellent! Mình đã thi IELTS được 7.5 overall nhờ luyện với các bài test này. Phần feedback sau khi làm xong rất chi tiết, giúp mình cải thiện từng kỹ năng một cách hiệu quả. Đặc biệt phần reading với giao diện split screen rất tiện lợi!'
      }
    ],
    relatedTests: [
      { id: 2, title: 'IELTS General Training Test', icon: 'fa-book-open', time: '165 phút', rating: 4.7 },
      { id: 3, title: 'TOEFL iBT Practice Test', icon: 'fa-graduation-cap', time: '180 phút', rating: 4.6 },
      { id: 4, title: 'Business English Test', icon: 'fa-briefcase', time: '90 phút', rating: 4.5 },
      { id: 5, title: 'Academic Writing Practice', icon: 'fa-pen', time: '60 phút', rating: 4.8 }
    ],
    creator: {
      name: 'Dr. Thảo Nguyễn',
      avatar: 'DT',
      credentials: 'IELTS 8.5 • 10 năm kinh nghiệm'
    },
    importantNotes: [
      'Bài test không thể tạm dừng sau khi bắt đầu',
      'Bạn chỉ có thể làm bài test này 1 lần',
      'Kết quả sẽ được lưu lại và hiển thị sau khi hoàn thành',
      'Đảm bảo kết nối internet ổn định trong suốt quá trình làm bài',
      'Không được sử dụng từ điển hoặc công cụ hỗ trợ'
    ]
  };

  const toggleSkill = (skillId) => {
    if (expandedSkills.includes(skillId)) {
      setExpandedSkills(expandedSkills.filter(id => id !== skillId));
    } else {
      setExpandedSkills([...expandedSkills, skillId]);
    }
  };

  const handleStartTest = () => {
    if (window.confirm('Bạn có chắc chắn muốn bắt đầu bài test? Bài test không thể tạm dừng sau khi bắt đầu.')) {
      navigate(`/test/${id}/start`);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="test-detail-page">
      {/* Header */}
      <header>
        <div className="header-content">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">EnglishTest <span>Pro</span></div>
          </a>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">NA</div>
              <div className="user-name">Nguyen Van A</div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <i className="fas fa-home"></i> Dashboard
          </a>
          <span className="breadcrumb-separator"><i className="fas fa-chevron-right"></i></span>
          <span className="breadcrumb-current">{testData.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <div className="test-layout">
          {/* Left Column */}
          <div className="test-main">
            {/* Test Header */}
            <div className="test-header-card">
              <div className="test-thumbnail">
                <img src={testData.thumbnail} alt={testData.title} />
                <span className="difficulty-badge">{testData.difficulty}</span>
              </div>
              <div className="test-info">
                <div className="test-title-row">
                  <h1 className="test-title">{testData.title}</h1>
                  {testData.verified && (
                    <span className="verified-badge">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                  )}
                </div>
                <div className="test-meta">
                  <div className="meta-item">
                    <i className="fas fa-signal"></i>
                    <span>Cấp độ: <strong>{testData.level}</strong></span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    <span>Thời gian: <strong>{testData.duration}</strong></span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-users"></i>
                    <span><strong>{testData.attemptCount.toLocaleString()}</strong> người đã làm</span>
                  </div>
                </div>
                <div className="rating-display">
                  <div className="stars">{renderStars(testData.rating)}</div>
                  <span className="rating-count">{testData.rating} ({testData.reviewCount} đánh giá)</span>
                </div>
                <p className="test-description">{testData.description}</p>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="skills-section">
              <h2 className="section-title">Bạn sẽ làm gì trong bài test này</h2>
              <div className="skills-grid">
                {testData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`skill-card ${expandedSkills.includes(skill.id) ? 'expanded' : ''}`}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <div className="skill-header">
                      <div className="skill-icon-title">
                        <div className={`skill-icon ${skill.color}`}>
                          <i className={`fas ${skill.icon}`}></i>
                        </div>
                        <div>
                          <div className="skill-name">{skill.name}</div>
                          <div className="skill-time">{skill.time}</div>
                        </div>
                      </div>
                      <i className="fas fa-chevron-down expand-icon"></i>
                    </div>
                    <div className="skill-details">
                      {Object.entries(skill.details).map(([key, value]) => (
                        <div key={key} className="detail-item">
                          <span className="detail-label">
                            {key === 'questions' && 'Số câu hỏi:'}
                            {key === 'parts' && 'Số phần:'}
                            {key === 'types' && 'Dạng câu hỏi:'}
                            {key === 'scoring' && 'Chấm điểm:'}
                            {key === 'task1' && 'Task 1:'}
                            {key === 'task2' && 'Task 2:'}
                            {key === 'part1' && 'Part 1:'}
                            {key === 'part2' && 'Part 2:'}
                            {key === 'part3' && 'Part 3:'}
                          </span>
                          <span className="detail-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="requirements-section">
              <h2 className="section-title">Bạn cần chuẩn bị</h2>
              <div className="requirements-list">
                {testData.requirements.map((req, index) => (
                  <div key={index} className="requirement-item">
                    <div className="requirement-icon">
                      <i className={`fas ${req.icon}`}></i>
                    </div>
                    <span className="requirement-text">{req.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="leaderboard-section">
              <div className="leaderboard-header">
                <h2 className="section-title" style={{ marginBottom: 0 }}>Bảng xếp hạng</h2>
                <a href="#" className="view-all-link">
                  Xem tất cả <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="leaderboard-list">
                {testData.leaderboard.map((item) => (
                  <div key={item.rank} className="leaderboard-item">
                    <div className={`rank-badge ${item.badge}`}>{item.rank}</div>
                    <div className="leaderboard-avatar">{item.avatar}</div>
                    <div className="leaderboard-info">
                      <div className="leaderboard-name">{item.name}</div>
                      <div className="leaderboard-date">{item.date}</div>
                    </div>
                    <div className="leaderboard-score">{item.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
              <div className="reviews-header">
                <h2 className="section-title" style={{ marginBottom: 0 }}>Đánh giá từ học viên</h2>
                <div className="rating-summary">
                  <div className="rating-number">{testData.rating}</div>
                  <div className="rating-info">
                    <div className="stars">{renderStars(testData.rating)}</div>
                    <div className="rating-count">{testData.reviewCount} đánh giá</div>
                  </div>
                </div>
              </div>
              <div className="review-list">
                {testData.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-avatar">{review.avatar}</div>
                      <div className="review-user-info">
                        <div className="review-name">{review.name}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <div className="review-stars">{renderStars(review.rating)}</div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tests */}
            <div className="related-section">
              <h2 className="section-title">Các bài test liên quan</h2>
              <div className="related-scroll">
                {testData.relatedTests.map((test) => (
                  <div
                    key={test.id}
                    className="related-card"
                    onClick={() => navigate(`/test/${test.id}`)}
                  >
                    <div className="related-thumbnail">
                      <i className={`fas ${test.icon}`}></i>
                    </div>
                    <div className="related-title">{test.title}</div>
                    <div className="related-meta">
                      <span><i className="fas fa-clock"></i> {test.time}</span>
                      <span><i className="fas fa-star"></i> {test.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="test-sidebar">
            {/* Start Card */}
            <div className="start-card">
              <h3 className="start-card-title">Sẵn sàng bắt đầu?</h3>
              <div className="time-estimate">
                <i className="fas fa-hourglass-half"></i>
                <span>Thời gian: {testData.duration}</span>
              </div>
              <button className="btn-start" onClick={handleStartTest}>
                <i className="fas fa-play-circle"></i>
                <span>Bắt đầu bài test</span>
              </button>

              <div className="important-notes">
                <div className="notes-header" onClick={() => setNotesExpanded(!notesExpanded)}>
                  <div className="notes-title">
                    <i className="fas fa-exclamation-triangle"></i>
                    Lưu ý quan trọng
                  </div>
                  <i
                    className="fas fa-chevron-down"
                    style={{ transform: notesExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                  ></i>
                </div>
                <div className={`notes-content ${notesExpanded ? 'expanded' : ''}`}>
                  <ul className="notes-list">
                    {testData.importantNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Creator Card */}
            <div className="creator-card">
              <div className="creator-title">TEST ĐƯỢC TẠO BỞI</div>
              <div className="creator-info">
                <div className="creator-avatar">{testData.creator.avatar}</div>
                <div className="creator-details">
                  <div className="creator-name">{testData.creator.name}</div>
                  <div className="creator-credentials">{testData.creator.credentials}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestDetail;
