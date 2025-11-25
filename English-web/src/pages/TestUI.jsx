import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigation from '../components/TestNavigation';
import '../styles/TestUI.css';

function TestUI() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [showSettings, setShowSettings] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60 + 30); // 45:30
  const [showToast, setShowToast] = useState(false);
  const [currentHighlightColor, setCurrentHighlightColor] = useState('yellow');
  const [settings, setSettings] = useState({
    darkMode: false,
    syncScroll: false,
    lineNumbers: false,
    fontFamily: 'Lato, sans-serif'
  });

  // Mock test data
  const testData = {
    title: 'IELTS Reading Test - Passage 1 of 3',
    passage: {
      title: 'The Evolution of Renewable Energy',
      readingTime: '~6 minutes',
      wordCount: 847,
      difficulty: 'Band 7-8 level',
      content: `The global energy landscape has undergone a remarkable transformation over the past two decades, with renewable energy sources emerging as viable alternatives to traditional fossil fuels. Solar, wind, and hydroelectric power have transitioned from niche technologies to mainstream energy solutions, driven by technological advancements, decreasing costs, and growing environmental concerns. This shift represents not merely a change in energy production methods, but a fundamental reimagining of how societies generate and consume power.

Solar photovoltaic technology exemplifies this evolution most dramatically. In the early 2000s, solar panels were prohibitively expensive, costing approximately $5 per watt of generating capacity. Today, that figure has plummeted to less than $0.50 per watt in many markets, making solar energy cost-competitive with conventional power sources. This dramatic price reduction stems from improved manufacturing processes, economies of scale, and innovations in materials science. Modern solar cells achieve conversion efficiencies exceeding 22%, compared to just 15% a decade ago. Furthermore, advances in energy storage technology, particularly lithium-ion batteries, have addressed the intermittency challenges that previously limited solar energy's reliability. These batteries now enable households and businesses to store excess solar energy generated during peak sunlight hours for use during evening periods, effectively creating self-sufficient energy systems.

Wind energy has experienced a parallel trajectory of rapid development and deployment. Offshore wind farms, once considered impractical due to engineering challenges and high costs, now represent some of the world's largest renewable energy installations. The Hornsea Project in the United Kingdom, for instance, generates sufficient electricity to power over one million homes. Turbine technology has advanced significantly, with modern units featuring blade spans exceeding 220 meters and generating capacities of 12 megawatts or more per turbine. These improvements have made wind energy economically viable in regions previously deemed unsuitable. Moreover, sophisticated forecasting systems utilizing artificial intelligence can now predict wind patterns with remarkable accuracy, enabling grid operators to integrate wind power more effectively into national electricity networks. The combination of technological progress and supportive government policies has positioned wind energy as a cornerstone of many nations' decarbonization strategies, with some countries already generating more than 40% of their electricity from wind sources.`
    },
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        text: 'According to the passage, what was the approximate cost per watt of solar panel capacity in the early 2000s?',
        options: [
          '$0.50 per watt',
          '$5 per watt',
          '$22 per watt',
          'The passage does not specify'
        ]
      },
      {
        id: 2,
        type: 'multiple-choice',
        text: 'What is the main advantage of lithium-ion batteries mentioned in the passage?',
        options: [
          'They are cheaper than other battery types',
          'They can store excess solar energy for later use',
          'They improve solar panel efficiency',
          'They reduce manufacturing costs'
        ]
      },
      {
        id: 3,
        type: 'true-false',
        text: 'The Hornsea Project generates enough electricity to power over one million homes.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN']
      },
      {
        id: 4,
        type: 'dropdown',
        text: 'Modern solar cells achieve conversion efficiencies exceeding __________.',
        options: ['Select an answer', '15%', '22%', '40%', '50%']
      },
      {
        id: 5,
        type: 'multiple-choice',
        text: 'Which of the following is NOT mentioned as a factor in the development of renewable energy?',
        options: [
          'Technological advancements',
          'Decreasing costs',
          'Environmental concerns',
          'Government subsidies for consumers'
        ]
      },
      {
        id: 6,
        type: 'multiple-choice',
        text: 'What role does artificial intelligence play in wind energy according to the passage?',
        options: [
          'It designs more efficient turbines',
          'It predicts wind patterns for grid integration',
          'It reduces the cost of wind farms',
          'It increases turbine blade spans'
        ]
      },
      {
        id: 7,
        type: 'true-false',
        text: 'Some countries now generate more than 40% of their electricity from wind sources.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN']
      },
      {
        id: 8,
        type: 'multiple-choice',
        text: 'The passage suggests that offshore wind farms were once considered:',
        options: [
          'The most efficient form of renewable energy',
          'Impractical due to engineering challenges',
          'Too expensive for any country to afford',
          'Less effective than solar energy'
        ]
      },
      {
        id: 9,
        type: 'dropdown',
        text: 'Modern wind turbine units can generate __________ or more per turbine.',
        options: ['Select an answer', '5 megawatts', '12 megawatts', '22 megawatts', '40 megawatts']
      },
      {
        id: 10,
        type: 'multiple-choice',
        text: 'What does the passage identify as the primary shift in renewable energy?',
        options: [
          'A change from expensive to affordable technology',
          'A transition from niche to mainstream energy solutions',
          'A move from government to private sector control',
          'A shift from research to commercial production'
        ]
      }
    ]
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save simulation
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (Object.keys(answers).length > 0) {
        showToastNotification();
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(autoSave);
  }, [answers]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    showToastNotification();
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const changeFontSize = (delta) => {
    if (delta === 0) {
      setFontSize(17);
    } else if (delta === -1 && fontSize > 14) {
      setFontSize(prev => prev - 1);
    } else if (delta === 1 && fontSize < 20) {
      setFontSize(prev => prev + 1);
    }
  };

  const toggleSetting = (settingName) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  const showToastNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = testData.questions.length;
    
    if (answeredCount < totalQuestions) {
      if (!window.confirm(`Bạn mới trả lời ${answeredCount}/${totalQuestions} câu hỏi. Bạn có chắc muốn nộp bài?`)) {
        return;
      }
    }
    
    alert('Bài test đã được nộp! Đang chuyển đến trang kết quả...');
    navigate(`/test/${id}/results`);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getProgressCircles = () => {
    return testData.questions.map((q, index) => (
      <div
        key={q.id}
        className={`progress-circle ${answers[q.id] ? 'answered' : ''}`}
      />
    ));
  };

  return (
    <div className="test-ui-page">
      <TestNavigation currentSection="reading" completedSections={['listening']} />
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="test-title">{testData.title}</div>
          <div className="progress-info">
            <div className="progress-circles">
              {getProgressCircles()}
            </div>
            <span className="progress-text">
              {getAnsweredCount()}/{testData.questions.length} answered
            </span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="timer">
            <i className="fas fa-clock"></i>
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={handleSubmit}
            disabled={getAnsweredCount() === 0}
          >
            Nộp bài
          </button>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(true)}
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Panel - Reading Passage */}
        <div className="left-panel">
          <div className="passage-header">
            <div className="passage-title">{testData.passage.title}</div>
            <div className="reading-time">
              <i className="far fa-clock"></i>
              {testData.passage.readingTime}
            </div>
          </div>

          <div className="toolbar">
            <div className="toolbar-group">
              <span className="toolbar-label">Font size:</span>
              <button className="font-btn" onClick={() => changeFontSize(-1)}>A-</button>
              <button className="font-btn" onClick={() => changeFontSize(0)}>A</button>
              <button className="font-btn" onClick={() => changeFontSize(1)}>A+</button>
            </div>
            <div className="toolbar-group">
              <span className="toolbar-label">Highlight:</span>
              <div 
                className="highlight-color yellow" 
                onClick={() => setCurrentHighlightColor('yellow')}
                style={{ borderColor: currentHighlightColor === 'yellow' ? '#1F2937' : 'transparent' }}
              />
              <div 
                className="highlight-color green"
                onClick={() => setCurrentHighlightColor('green')}
                style={{ borderColor: currentHighlightColor === 'green' ? '#1F2937' : 'transparent' }}
              />
              <div 
                className="highlight-color blue"
                onClick={() => setCurrentHighlightColor('blue')}
                style={{ borderColor: currentHighlightColor === 'blue' ? '#1F2937' : 'transparent' }}
              />
              <div 
                className="highlight-color pink"
                onClick={() => setCurrentHighlightColor('pink')}
                style={{ borderColor: currentHighlightColor === 'pink' ? '#1F2937' : 'transparent' }}
              />
            </div>
            <button className="toolbar-icon-btn" title="Add note">
              <i className="fas fa-sticky-note"></i>
            </button>
            <button className="toolbar-icon-btn" title="Print">
              <i className="fas fa-print"></i>
            </button>
          </div>

          <div className="reading-area">
            <div 
              className="passage-content" 
              style={{ 
                fontSize: `${fontSize}px`,
                fontFamily: settings.fontFamily
              }}
            >
              <h2>{testData.passage.title}</h2>
              {testData.passage.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="passage-footer">
            <div className="word-count">{testData.passage.wordCount} words</div>
            <div className="difficulty-badge">{testData.passage.difficulty}</div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Right Panel - Questions */}
        <div className="right-panel">
          <div className="question-tabs">
            <div 
              className={`question-tab ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              Questions 1-4
            </div>
            <div 
              className={`question-tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              Questions 5-7
            </div>
            <div 
              className={`question-tab ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              Questions 8-10
            </div>
          </div>

          <div className="questions-area">
            {testData.questions.map((question, index) => (
              <div 
                key={question.id}
                className={`question-card ${answers[question.id] ? 'active' : ''}`}
              >
                <div className="question-header">
                  <div className="question-number">Question {question.id}</div>
                  <label className="mark-review">
                    <input 
                      type="checkbox"
                      checked={markedForReview.includes(question.id)}
                      onChange={() => toggleMarkForReview(question.id)}
                    />
                    <span>Mark for review</span>
                  </label>
                </div>
                <div className="question-text">
                  {question.text}
                </div>

                {question.type === 'multiple-choice' && (
                  <div className="answer-options">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`answer-option ${answers[question.id] === option ? 'selected' : ''}`}
                        onClick={() => handleAnswerChange(question.id, option)}
                      >
                        <input 
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleAnswerChange(question.id, option)}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="answer-options">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`answer-option ${answers[question.id] === option ? 'selected' : ''}`}
                        onClick={() => handleAnswerChange(question.id, option)}
                      >
                        <input 
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleAnswerChange(question.id, option)}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'dropdown' && (
                  <select
                    className="dropdown-select"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  >
                    {question.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="bottom-nav">
            <div className="nav-buttons">
              <button className="btn-nav">
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>
              <button className="btn-nav btn-primary">
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <button className="btn-nav btn-questions">
              <i className="fas fa-list"></i>
              All Questions
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay show" onClick={() => setShowSettings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Reading Settings</div>
              <button className="close-modal" onClick={() => setShowSettings(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="setting-item">
                <div className="setting-label">Dark Mode</div>
                <div 
                  className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                  onClick={() => toggleSetting('darkMode')}
                />
              </div>
              <div className="setting-item">
                <div className="setting-label">Sync Scroll</div>
                <div 
                  className={`toggle-switch ${settings.syncScroll ? 'active' : ''}`}
                  onClick={() => toggleSetting('syncScroll')}
                />
              </div>
              <div className="setting-item">
                <div className="setting-label">Line Numbers</div>
                <div 
                  className={`toggle-switch ${settings.lineNumbers ? 'active' : ''}`}
                  onClick={() => toggleSetting('lineNumbers')}
                />
              </div>
              <div className="setting-item">
                <div className="setting-label">Font Family</div>
                <select 
                  className="font-select"
                  value={settings.fontFamily}
                  onChange={(e) => setSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                >
                  <option value="Lato, sans-serif">Lato</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <i className="fas fa-check-circle"></i>
        <span>Your progress has been saved</span>
      </div>
    </div>
  );
}

export default TestUI;
