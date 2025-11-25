import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigation from '../components/TestNavigation';
import '../styles/TestUI.css';
import '../styles/ReadingTest.css';

function ReadingTest() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [showSettings, setShowSettings] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 phút
  const [showToast, setShowToast] = useState(false);
  const [currentHighlightColor, setCurrentHighlightColor] = useState('yellow');
  const [completedSections] = useState(['listening']); // Đánh dấu phần đã hoàn thành

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
        type: 'short-answer',
        text: 'What is the blade span of modern wind turbines mentioned in the passage?',
        placeholder: 'Enter your answer...'
      }
    ]
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).filter(key => answers[key]).length;
  };

  return (
    <div className="test-ui-page">
      <TestNavigation currentSection="reading" completedSections={completedSections} />
      
      <div className="test-container">
        {/* Left Sidebar */}
        <aside className="test-sidebar left-sidebar">
          <div className="sidebar-header">
            <i className="fas fa-book-open"></i>
            <h3>Reading</h3>
          </div>

          <div className="passage-info">
            <h4>{testData.passage.title}</h4>
            <div className="info-grid">
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>{testData.passage.readingTime}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-file-word"></i>
                <span>{testData.passage.wordCount} từ</span>
              </div>
              <div className="info-item">
                <i className="fas fa-signal"></i>
                <span>{testData.passage.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="question-navigator">
            <h4>Câu hỏi ({getAnsweredCount()}/{testData.questions.length})</h4>
            <div className="question-grid">
              {testData.questions.map(q => (
                <button
                  key={q.id}
                  className={`question-number ${answers[q.id] ? 'answered' : ''} ${markedForReview.includes(q.id) ? 'marked' : ''}`}
                  onClick={() => {
                    const element = document.getElementById(`question-${q.id}`);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  {q.id}
                  {markedForReview.includes(q.id) && <i className="fas fa-flag"></i>}
                </button>
              ))}
            </div>
          </div>

          <div className="text-controls">
            <h4>Cài đặt văn bản</h4>
            <div className="font-size-control">
              <label>Cỡ chữ: {fontSize}px</label>
              <input
                type="range"
                min="14"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
            <div className="highlight-colors">
              <label>Màu đánh dấu:</label>
              <div className="color-options">
                {['yellow', 'green', 'blue', 'pink'].map(color => (
                  <button
                    key={color}
                    className={`color-btn ${color} ${currentHighlightColor === color ? 'active' : ''}`}
                    onClick={() => setCurrentHighlightColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="test-content">
          <div className="test-header">
            <div className="test-title">
              <h2>{testData.title}</h2>
            </div>
            <div className="test-timer">
              <i className="fas fa-hourglass-half"></i>
              <span className={timeRemaining < 300 ? 'timer-warning' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          <div className="reading-passage" style={{ fontSize: `${fontSize}px` }}>
            <h3>{testData.passage.title}</h3>
            {testData.passage.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="questions-section">
            <h3>Questions</h3>
            {testData.questions.map(question => (
              <div key={question.id} id={`question-${question.id}`} className="question-item">
                <div className="question-header">
                  <span className="question-number-label">Question {question.id}</span>
                  <button
                    className={`mark-review-btn ${markedForReview.includes(question.id) ? 'marked' : ''}`}
                    onClick={() => toggleMarkForReview(question.id)}
                  >
                    <i className="fas fa-flag"></i>
                    {markedForReview.includes(question.id) ? 'Đã đánh dấu' : 'Đánh dấu'}
                  </button>
                </div>
                <p className="question-text">{question.text}</p>

                {question.type === 'multiple-choice' && (
                  <div className="options">
                    {question.options.map((option, idx) => (
                      <label key={idx} className="option-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="options">
                    {question.options.map((option, idx) => (
                      <label key={idx} className="option-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'dropdown' && (
                  <select
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="answer-dropdown"
                  >
                    {question.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {question.type === 'short-answer' && (
                  <input
                    type="text"
                    placeholder={question.placeholder}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="answer-input"
                  />
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {showToast && (
        <div className="toast-notification">
          <i className="fas fa-check-circle"></i>
          <span>Đã lưu câu trả lời</span>
        </div>
      )}
    </div>
  );
}

export default ReadingTest;
