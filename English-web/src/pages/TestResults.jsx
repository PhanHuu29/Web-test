import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TestResults.css';

const listeningChartData = [
  { label: 'Part 1', score: 9 },
  { label: 'Part 2', score: 8 },
  { label: 'Part 3', score: 7 },
  { label: 'Part 4', score: 8 }
];

const performanceTrendData = [
  { label: 'Test 1', listening: 6.5, reading: 6.0, writing: 6.0, speaking: 6.5 },
  { label: 'Test 2', listening: 7.0, reading: 6.5, writing: 6.5, speaking: 7.0 },
  { label: 'Test 3', listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 },
  { label: 'Test 4', listening: 8.0, reading: 7.5, writing: 7.0, speaking: 7.5 }
];

const skillColors = {
  listening: '#8B5CF6',
  reading: '#3B82F6',
  writing: '#F59E0B',
  speaking: '#EC4899'
};

const TestResults = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const resultsData = {
    overallScore: 7.5,
    maxScore: 9,
    subtitle: "Congratulations! You've completed all sections of your English proficiency test.",
    percentile: 67,
    skills: [
      {
        name: 'Listening',
        icon: 'fa-headphones',
        className: 'listening',
        score: '8.0',
        max: '9.0',
        stats: [
          { label: 'Correct Answers', value: '32 / 40' },
          { label: 'Time Taken', value: '28:30' },
          { label: 'Accuracy', value: '80%' }
        ],
        subScores: [
          { label: 'Short Conv.', value: '9/10' },
          { label: 'Long Conv.', value: '8/10' },
          { label: 'Lectures', value: '8/10' }
        ]
      },
      {
        name: 'Reading',
        icon: 'fa-book-open',
        className: 'reading',
        score: '7.5',
        max: '9.0',
        stats: [
          { label: 'Correct Answers', value: '30 / 40' },
          { label: 'Time Taken', value: '52:15' }
        ],
        subScores: [
          { label: 'MCQ', value: '85%' },
          { label: 'T/F/NG', value: '70%' },
          { label: 'Matching', value: '80%' },
          { label: 'Summary', value: '75%' }
        ]
      },
      {
        name: 'Writing',
        icon: 'fa-pen',
        className: 'writing',
        score: '7.0',
        max: '9.0',
        subScores: [
          { label: 'Task Achievement', value: '7.0' },
          { label: 'Coherence', value: '7.5' },
          { label: 'Lexical Resource', value: '7.0' },
          { label: 'Grammar', value: '6.5' }
        ],
        comment: 'Good structure and clear arguments. Consider using more complex sentence structures and varied vocabulary for a higher score.'
      },
      {
        name: 'Speaking',
        icon: 'fa-microphone',
        className: 'speaking',
        score: '7.5',
        max: '9.0',
        subScores: [
          { label: 'Fluency', value: '8.0' },
          { label: 'Vocabulary', value: '7.5' },
          { label: 'Grammar', value: '7.0' },
          { label: 'Pronunciation', value: '8.0' }
        ],
        audio: {
          time: '2:15 / 6:30'
        }
      }
    ],
    strengths: [
      'Strong listening comprehension across different accents',
      'Good vocabulary range in speaking responses',
      'Clear pronunciation with confident delivery',
      'Well-structured writing with clear arguments'
    ],
    improvements: [
      'Use more complex sentence structures in writing',
      'Practice differentiating False vs Not Given in reading',
      'Improve pacing in the reading section',
      'Focus on grammatical accuracy during speaking'
    ],
    resources: [
      {
        icon: 'fa-pen-fancy',
        title: 'Grammar for IELTS Writing',
        description: 'Master complex sentence structures and improve grammatical range'
      },
      {
        icon: 'fa-list-check',
        title: 'True/False/Not Given Practice',
        description: 'Targeted drills to distinguish between tricky statement types'
      },
      {
        icon: 'fa-clock',
        title: 'Time Management Tips',
        description: 'Learn pacing strategies to finish every section comfortably'
      }
    ],
    actions: [
      { icon: 'fa-download', label: 'Download Detailed Report' },
      { icon: 'fa-eye', label: 'Review Answers' },
      { icon: 'fa-redo', label: 'Retake Test', action: () => navigate(`/test/${id}`) },
      { icon: 'fa-dumbbell', label: 'Practice Weak Areas' },
      { icon: 'fa-share-alt', label: 'Share Results' }
    ],
    nextSteps: [
      { icon: '📚', title: 'Personalized Learning Path', description: 'Get a customized study plan based on your performance' },
      { icon: '🎯', title: 'Practice Modules', description: 'Focus on specific skills that need improvement' },
      { icon: '📅', title: 'Schedule Next Test', description: 'Book your next assessment in 2 weeks' },
      { icon: '👥', title: 'Join Study Group', description: 'Connect with learners at your level' }
    ]
  };

  useEffect(() => {
    createConfetti();
    animatePercentile(resultsData.percentile);
  }, [resultsData.percentile]);

  const createConfetti = () => {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#F59E0B', '#10B981'];
    for (let i = 0; i < 50; i += 1) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 2}s`;
      piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
      container.appendChild(piece);
    }
  };

  const animatePercentile = (percentile) => {
    const fill = document.querySelector('.percentile-fill');
    if (!fill) return;
    requestAnimationFrame(() => {
      fill.style.width = `${percentile}%`;
    });
  };

  const renderListeningChart = () => {
    const width = 280;
    const height = 130;
    const margin = { top: 10, right: 10, bottom: 30, left: 30 };
    const barWidth = (width - margin.left - margin.right) / listeningChartData.length - 16;
    const maxScore = 9;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="listening-chart">
        <defs>
          <linearGradient id="listeningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {listeningChartData.map((item, index) => {
          const x = margin.left + index * (barWidth + 16);
          const barHeight = ((item.score / maxScore) * (height - margin.top - margin.bottom));
          const y = height - margin.bottom - barHeight;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={6}
                className="listening-bar"
              />
              <text x={x + barWidth / 2} y={height - margin.bottom + 16} className="chart-label">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderPerformanceChart = () => {
    const width = 900;
    const height = 300;
    const margin = { top: 20, right: 120, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const minScore = 5;
    const maxScore = 9;

    const xForIndex = (index) => margin.left + (chartWidth / (performanceTrendData.length - 1)) * index;
    const yForScore = (score) => margin.top + ((maxScore - score) / (maxScore - minScore)) * chartHeight;

    const skills = Object.keys(skillColors);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="performance-chart">
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} className="axis" />
        <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} className="axis" />

        {performanceTrendData.map((point, index) => (
          <text key={point.label} x={xForIndex(index)} y={height - margin.bottom + 24} className="chart-label">
            {point.label}
          </text>
        ))}

        {[5, 6, 7, 8, 9].map((tick) => (
          <g key={tick}>
            <text x={margin.left - 20} y={yForScore(tick) + 4} className="chart-label">
              {tick}
            </text>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yForScore(tick)}
              y2={yForScore(tick)}
              className="grid-line"
            />
          </g>
        ))}

        {skills.map((skill) => {
          const path = performanceTrendData
            .map((point, index) => `${index === 0 ? 'M' : 'L'}${xForIndex(index)},${yForScore(point[skill])}`)
            .join(' ');
          return (
            <g key={skill}>
              <path d={path} className="trend-line" style={{ stroke: skillColors[skill] }} />
              {performanceTrendData.map((point, index) => (
                <circle
                  key={`${skill}-${point.label}`}
                  cx={xForIndex(index)}
                  cy={yForScore(point[skill])}
                  r={5}
                  className="trend-dot"
                  style={{ fill: skillColors[skill] }}
                />
              ))}
            </g>
          );
        })}

        {skills.map((skill, index) => (
          <g key={`${skill}-legend`} transform={`translate(${width - margin.right + 20}, ${margin.top + index * 28})`}>
            <line x1={0} y1={0} x2={24} y2={0} stroke={skillColors[skill]} strokeWidth={3} />
            <text x={32} y={5} className="legend-text">{skill.charAt(0).toUpperCase() + skill.slice(1)}</text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="test-results-page">
      <header className="header">
        <div className="logo">English Mastery</div>
        <div className="header-actions">
          <button className="header-btn" onClick={() => navigate('/dashboard')}>
            <i className="fas fa-home" /> Dashboard
          </button>
          <button className="header-btn" onClick={() => navigate(`/test/${id}`)}>
            <i className="fas fa-redo" /> Retake Test
          </button>
        </div>
      </header>

      <main className="main-container">
        <section className="hero-section">
          <div className="confetti-container" id="confettiContainer" />
          <h1 className="hero-title">
            Test Complete <span className="celebration-emoji">🎉</span>
          </h1>
          <p className="hero-subtitle">{resultsData.subtitle}</p>
          <div className="overall-score">
            <div className="score-label">Overall Score</div>
            <div className="score-value">{resultsData.overallScore}</div>
            <div className="score-max">/ {resultsData.maxScore}</div>
          </div>
        </section>

        <h2 className="section-title">
          <i className="fas fa-chart-bar" /> Score Breakdown
        </h2>
        <div className="scores-grid">
          {resultsData.skills.map((skill) => (
            <div key={skill.name} className={`skill-card ${skill.className}`}>
              <div className="skill-header">
                <div className="skill-name">
                  <div className="skill-icon">
                    <i className={`fas ${skill.icon}`} />
                  </div>
                  {skill.name}
                </div>
                <div className="skill-score">
                  {skill.score} <span className="max">/ {skill.max}</span>
                </div>
              </div>

              {skill.stats && (
                <div className="skill-stats">
                  {skill.stats.map((stat) => (
                    <div key={stat.label} className="stat-row">
                      <span className="stat-label">{stat.label}</span>
                      <span className="stat-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={`sub-scores cols-${skill.subScores.length > 3 ? '4' : '3'}`}>
                {skill.subScores.map((sub) => (
                  <div key={sub.label} className="sub-score-item">
                    <div className="sub-score-label">{sub.label}</div>
                    <div className="sub-score-value">{sub.value}</div>
                  </div>
                ))}
              </div>

              {skill.comment && <div className="skill-comment">{skill.comment}</div>}

              {skill.audio && (
                <div className="audio-playback">
                  <button className="play-mini-btn">
                    <i className="fas fa-play" />
                  </button>
                  <div className="audio-timeline">
                    <div className="audio-progress" />
                  </div>
                  <span className="audio-time">{skill.audio.time}</span>
                </div>
              )}

              {skill.name === 'Listening' && <div className="chart-container">{renderListeningChart()}</div>}
            </div>
          ))}
        </div>

        <h2 className="section-title">
          <i className="fas fa-clipboard-check" /> Detailed Feedback
        </h2>
        <div className="feedback-section">
          <div className="feedback-grid">
            <div className="feedback-column strengths">
              <h3>
                <i className="fas fa-check-circle" /> Strengths
              </h3>
              <div className="feedback-list">
                {resultsData.strengths.map((item) => (
                  <div key={item} className="feedback-item strength">
                    <i className="fas fa-check-circle feedback-icon" />
                    <div className="feedback-text">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="feedback-column improvements">
              <h3>
                <i className="fas fa-exclamation-triangle" /> Areas for Improvement
              </h3>
              <div className="feedback-list">
                {resultsData.improvements.map((item) => (
                  <div key={item} className="feedback-item improvement">
                    <i className="fas fa-exclamation-triangle feedback-icon" />
                    <div className="feedback-text">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <h2 className="section-title">
            <i className="fas fa-chart-line" /> Performance Trend
          </h2>
          <div className="chart-wrapper">{renderPerformanceChart()}</div>
        </div>

        <div className="comparison-section">
          <div className="comparison-text">
            You scored better than <span className="highlight">{resultsData.percentile}%</span> of test-takers at your level
          </div>
          <div className="percentile-bar">
            <div className="percentile-fill">
              <div className="percentile-marker">👤</div>
            </div>
          </div>
        </div>

        <h2 className="section-title">
          <i className="fas fa-book-reader" /> Recommended Resources
        </h2>
        <div className="resources-grid">
          {resultsData.resources.map((resource) => (
            <div key={resource.title} className="resource-card">
              <div className="resource-icon">
                <i className={`fas ${resource.icon}`} />
              </div>
              <div className="resource-title">{resource.title}</div>
              <div className="resource-desc">{resource.description}</div>
            </div>
          ))}
        </div>

        <div className="actions-section">
          {resultsData.actions.map((action, index) => (
            <button
              key={action.label}
              className={`action-btn ${index === 0 ? 'primary' : 'secondary'}`}
              onClick={action.action}
            >
              <i className={`fas ${action.icon}`} />
              {action.label}
            </button>
          ))}
        </div>

        <div className="next-section">
          <h2 className="next-title">What's Next?</h2>
          <p className="next-subtitle">Continue your learning journey with personalized recommendations</p>
          <div className="next-grid">
            {resultsData.nextSteps.map((step) => (
              <div key={step.title} className="next-card">
                <div className="next-card-icon">{step.icon}</div>
                <div className="next-card-title">{step.title}</div>
                <div className="next-card-desc">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestResults;
