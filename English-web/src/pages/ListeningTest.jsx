import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigation from '../components/TestNavigation';
import '../styles/ListeningTest.css';

function ListeningTest() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(84); // 1:24
  const [duration] = useState(225); // 3:45
  const [volume, setVolume] = useState(75);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [replaysRemaining, setReplaysRemaining] = useState(2);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1530); // 25:30
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState('');
  const [highlightedInput, setHighlightedInput] = useState(null);
  const [highlightedQuestion, setHighlightedQuestion] = useState(null);

  const audioRef = useRef(null);

  // Test data
  const testData = {
    section: 'Section 1 of 4',
    title: 'Campus Conversation - Library Hours',
    accent: 'British English',
    context: 'You will hear a conversation between a student and a librarian about library opening hours and facilities. The student is asking about access times and special collections.',
    instructions: [
      'You will hear the audio ONCE with 2 replay opportunities',
      'Write your answers as you listen',
      'You can make notes during the recording',
      'All answers must be spelled correctly'
    ],
    formQuestions: [
      { id: 1, label: 'Library Main Desk Hours (Monday to Friday):' },
      { id: 2, label: 'Saturday Opening Hours:' },
      { id: 3, label: 'Special Collections Room Opens At:' },
      { id: 4, label: 'Student ID Required After:' },
      { id: 5, label: 'Latest Book Return Time:' }
    ],
    mcqQuestions: [
      {
        id: 6,
        text: 'What service is available 24 hours?',
        options: [
          { value: 'A', label: 'Computer labs' },
          { value: 'B', label: 'Online catalog access' },
          { value: 'C', label: 'Study rooms booking' }
        ]
      },
      {
        id: 7,
        text: 'How many books can students borrow at once?',
        options: [
          { value: 'A', label: 'Up to 5 books' },
          { value: 'B', label: 'Up to 10 books' },
          { value: 'C', label: 'Up to 15 books' }
        ]
      },
      {
        id: 8,
        text: 'What is the fine for late returns?',
        options: [
          { value: 'A', label: '$0.50 per day' },
          { value: 'B', label: '$1.00 per day' },
          { value: 'C', label: '$2.00 per day' }
        ]
      },
      {
        id: 9,
        text: 'Where can students find journal articles?',
        options: [
          { value: 'A', label: 'Ground floor reference section' },
          { value: 'B', label: 'Second floor periodicals room' },
          { value: 'C', label: 'Online database only' }
        ]
      },
      {
        id: 10,
        text: 'What does the librarian recommend for exam preparation?',
        options: [
          { value: 'A', label: 'Booking a private study room' },
          { value: 'B', label: 'Joining a study group' },
          { value: 'C', label: 'Using the quiet reading room' }
        ]
      }
    ],
    transcript: [
      { speaker: 'Student', text: "Hello, I'd like to know about the library opening hours." },
      { speaker: 'Librarian', text: "Of course! The main desk is open from 8 AM to 10 PM, Monday to Friday." },
      { speaker: 'Student', text: "What about weekends?" },
      { speaker: 'Librarian', text: "On Saturdays, we open from 10 AM to 6 PM. We're closed on Sundays." }
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

  // Audio playback simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  // Simulated audio-question synchronization
  useEffect(() => {
    if (isPlaying) {
      const timers = [
        setTimeout(() => highlightInput(1), 3000),
        setTimeout(() => highlightInput(2), 8000),
        setTimeout(() => highlightQuestion(6), 15000),
        setTimeout(() => highlightQuestion(7), 22000)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    setCurrentTime(prev => Math.max(0, prev - 10));
  };

  const skipForward = () => {
    setCurrentTime(prev => Math.min(duration, prev + 10));
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const highlightInput = (questionId) => {
    setHighlightedInput(questionId);
    setTimeout(() => setHighlightedInput(null), 1000);
  };

  const highlightQuestion = (questionId) => {
    setHighlightedQuestion(questionId);
    setTimeout(() => setHighlightedQuestion(null), 2000);
  };

  const handleReplay = () => {
    if (replaysRemaining > 0) {
      setCurrentTime(0);
      setIsPlaying(true);
      setReplaysRemaining(prev => prev - 1);
    } else {
      alert('No replays remaining!');
    }
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = testData.formQuestions.length + testData.mcqQuestions.length;
    
    if (answeredCount < totalQuestions) {
      if (!window.confirm(`You answered ${answeredCount}/${totalQuestions} questions. Are you sure you want to submit?`)) {
        return;
      }
    }
    
    alert('Test submitted! Redirecting to results...');
    navigate(`/test/${id}/results`);
  };

  const pauseTest = () => {
    if (window.confirm('Are you sure you want to pause the test? The timer will stop.')) {
      setIsPlaying(false);
    }
  };

  const getAnsweredQuestions = () => {
    return Object.keys(answers).map(Number);
  };

  const getCurrentQuestion = () => {
    const answered = getAnsweredQuestions();
    for (let i = 1; i <= 10; i++) {
      if (!answered.includes(i)) return i;
    }
    return 10;
  };

  // Generate waveform bars
  const generateWaveformBars = () => {
    const heights = [24, 42, 56, 38, 62, 48, 72, 45, 58, 35, 68, 52, 44, 60, 38, 54, 46, 64, 40, 58];
    const progress = (currentTime / duration) * 100;
    
    return heights.map((height, index) => {
      const barProgress = (index / heights.length) * 100;
      return (
        <div
          key={index}
          className={`wave-bar ${barProgress < progress ? 'active' : ''}`}
          style={{ height: `${height}px` }}
        />
      );
    });
  };

  return (
    <div className="listening-test-page">
      <TestNavigation currentSection="listening" completedSections={[]} />
      {/* Header */}
      <div className="test-header">
        <div className="test-header-left">
          <div className="logo">English Mastery</div>
          <div className="skill-badge">
            <i className="fas fa-headphones"></i>
            Listening Test
          </div>
          <div className="section-indicator">{testData.section}</div>
        </div>
        <div className="timer-display">
          <i className="fas fa-clock"></i>
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="listening-container">
        {/* Instructions Section */}
        <div className="instructions-section">
          <button 
            className={`instructions-toggle ${showInstructions ? 'expanded' : ''}`}
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <span><i className="fas fa-info-circle"></i> Click to view instructions</span>
            <i className="fas fa-chevron-down"></i>
          </button>
          <div className={`instructions-content ${showInstructions ? 'expanded' : ''}`}>
            <p>You will hear a conversation between a student and a librarian. Listen carefully and answer questions 1-10.</p>
            <ul>
              {testData.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Audio Player Card */}
        <div className="audio-player-card">
          <div className="audio-header">
            <div className="audio-title">{testData.title}</div>
            <div className="audio-badges">
              <span className="audio-badge accent-badge">
                <i className="fas fa-globe"></i>
                {testData.accent}
              </span>
              <span className="audio-badge replay-badge">
                <i className="fas fa-redo"></i>
                {replaysRemaining} replays remaining
              </span>
            </div>
          </div>

          {/* Waveform */}
          <div className="waveform-container">
            <div 
              className="waveform-progress" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <div className="waveform-bars">
              {generateWaveformBars()}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="audio-controls">
            <button className="play-button" onClick={togglePlay}>
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>

            <div className="time-display">
              <span className="current">{formatTime(currentTime)}</span> / {formatTime(duration)}
            </div>

            <div className="control-buttons">
              <button className="skip-button" onClick={skipBackward}>
                <i className="fas fa-backward"></i> 10s
              </button>
              
              <select 
                className="speed-selector"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              >
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
              </select>

              <button className="skip-button" onClick={skipForward}>
                10s <i className="fas fa-forward"></i>
              </button>

              <button className="skip-button" onClick={handleReplay}>
                <i className="fas fa-redo"></i>
              </button>
            </div>

            <div className="volume-control">
              <i className="fas fa-volume-up volume-icon"></i>
              <input 
                type="range" 
                className="volume-slider"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Main Content */}
          <div className="main-content">
            {/* Context Card */}
            <div className="context-card">
              <div className="context-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="context-text">{testData.context}</div>
            </div>

            {/* Questions Section */}
            <div className="questions-section">
              <div className="question-group-header">Questions 1-5: Complete the form below</div>
              <div className="question-instructions">Write NO MORE THAN TWO WORDS for each answer.</div>

              <div className="form-questions">
                <div className="form-title">University Library Information</div>

                {testData.formQuestions.map((question) => (
                  <div key={question.id} className="form-row">
                    <div className="form-label">
                      <span className="form-number">{question.id}.</span> {question.label}
                    </div>
                    <input 
                      type="text"
                      className={`form-input ${highlightedInput === question.id ? 'highlighted' : ''}`}
                      placeholder="Your answer"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Multiple Choice Section */}
              <div className="mcq-section">
                <div className="question-group-header">Questions 6-10: Choose the correct answer</div>

                {testData.mcqQuestions.map((question) => (
                  <div 
                    key={question.id}
                    className={`mcq-question ${highlightedQuestion === question.id ? 'active' : ''}`}
                  >
                    <div className="question-text">
                      <span className="question-number">{question.id}.</span> {question.text}
                    </div>
                    <div className="mcq-options">
                      {question.options.map((option) => (
                        <div key={option.value} className="mcq-option">
                          <input 
                            type="radio"
                            name={`q${question.id}`}
                            value={option.value}
                            checked={answers[question.id] === option.value}
                            onChange={() => handleAnswerChange(question.id, option.value)}
                          />
                          <label>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="right-sidebar">
            {/* Transcript Section */}
            <div className="sidebar-card">
              <button 
                className="transcript-toggle"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                <i className="fas fa-file-alt"></i>
                <span>{showTranscript ? 'Hide Transcript' : 'Show Transcript'}</span>
              </button>
              <div className={`transcript-content ${showTranscript ? 'expanded' : ''}`}>
                <div className="transcript-text">
                  {testData.transcript.map((line, index) => (
                    <p key={index}>
                      <strong>{line.speaker}:</strong> {line.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div className="sidebar-card">
              <div className="sidebar-title">
                <i className="fas fa-list-ol"></i>
                Question Navigator
              </div>
              <div className="question-navigator">
                {[...Array(10)].map((_, index) => {
                  const questionId = index + 1;
                  const isAnswered = getAnsweredQuestions().includes(questionId);
                  const isCurrent = getCurrentQuestion() === questionId;
                  
                  return (
                    <div
                      key={questionId}
                      className={`question-nav-item ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      {questionId}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notes Section */}
            <div className="sidebar-card">
              <div className="sidebar-title">
                <i className="fas fa-sticky-note"></i>
                Quick Notes
              </div>
              <textarea 
                className="notes-textarea"
                placeholder="Take notes while listening..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Help Button */}
            <div className="sidebar-card">
              <button 
                className="help-button"
                onClick={() => alert('Audio Troubleshooting:\n\n1. Check your volume settings\n2. Ensure speakers/headphones are connected\n3. Try refreshing the page\n4. Contact support if issues persist')}
              >
                <i className="fas fa-question-circle"></i>
                Audio Troubleshooting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <button className="nav-button secondary" onClick={() => navigate('/dashboard')}>
          <i className="fas fa-chevron-left"></i>
          Previous Section
        </button>
        <button className="nav-button pause-button" onClick={pauseTest}>
          <i className="fas fa-pause"></i>
          Pause Test
        </button>
        <button className="nav-button primary" onClick={handleSubmit}>
          Next Section
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default ListeningTest;
