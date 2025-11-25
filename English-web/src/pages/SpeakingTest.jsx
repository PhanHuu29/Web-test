import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigation from '../components/TestNavigation';
import '../styles/SpeakingTest.css';

function SpeakingTest() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [currentPart, setCurrentPart] = useState(2);
  const [phase, setPhase] = useState('preparation'); // 'preparation' | 'recording' | 'playback'
  const [prepTime, setPrepTime] = useState(58);
  const [mainTime, setMainTime] = useState(825); // 13:45
  const [recordTime, setRecordTime] = useState(105); // 1:45
  const [notesText, setNotesText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rerecordAttempts, setRerecordAttempts] = useState(1);
  const [volumeLevel, setVolumeLevel] = useState(3);
  const [waveformHeights, setWaveformHeights] = useState(
    Array(15).fill(0).map(() => Math.random() * 60 + 20)
  );

  const recordIntervalRef = useRef(null);
  const waveformIntervalRef = useRef(null);
  const volumeIntervalRef = useRef(null);

  // Test data
  const testData = {
    parts: [
      { id: 1, name: 'Part 1', status: 'completed' },
      { id: 2, name: 'Part 2', status: 'active' },
      { id: 3, name: 'Part 3', status: 'pending' }
    ],
    currentPrompt: {
      part: 2,
      title: 'Individual Long Turn',
      question: 'Describe a place you like to visit',
      points: [
        'Where it is',
        'How often you go there',
        'What you do there',
        'And explain why you like this place'
      ]
    },
    criteria: [
      {
        name: 'Fluency & Coherence',
        score: '0-9',
        description: 'Speak smoothly without long pauses. Connect ideas logically with appropriate linking words.'
      },
      {
        name: 'Lexical Resource',
        score: '0-9',
        description: 'Use a wide range of vocabulary accurately and appropriately for the context.'
      },
      {
        name: 'Grammatical Range & Accuracy',
        score: '0-9',
        description: 'Use varied sentence structures with good accuracy. Control of complex grammar.'
      },
      {
        name: 'Pronunciation',
        score: '0-9',
        description: 'Speak clearly with correct stress, rhythm, and intonation. Be easily understood.'
      }
    ],
    tips: [
      'Take the full minute to prepare',
      'Note key points, not full sentences',
      'Speak for the full 2 minutes'
    ],
    testDetails: [
      { label: 'Duration', value: '2 minutes speaking' },
      { label: 'Re-record attempts', value: '1 available' },
      { label: 'Auto-submit', value: 'After 2:00' }
    ]
  };

  // Preparation timer countdown
  useEffect(() => {
    if (phase === 'preparation' && prepTime > 0) {
      const timer = setTimeout(() => {
        setPrepTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [prepTime, phase]);

  // Main timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setMainTime(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recording timer countdown
  useEffect(() => {
    if (phase === 'recording' && isRecording && !isPaused) {
      recordIntervalRef.current = setInterval(() => {
        setRecordTime(prev => {
          if (prev <= 0) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    }
    return () => {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    };
  }, [phase, isRecording, isPaused]);

  // Waveform animation
  useEffect(() => {
    if (phase === 'recording' && isRecording && !isPaused) {
      waveformIntervalRef.current = setInterval(() => {
        setWaveformHeights(
          Array(15).fill(0).map(() => Math.random() * 60 + 20)
        );
      }, 150);
    } else {
      if (waveformIntervalRef.current) {
        clearInterval(waveformIntervalRef.current);
      }
    }
    return () => {
      if (waveformIntervalRef.current) {
        clearInterval(waveformIntervalRef.current);
      }
    };
  }, [phase, isRecording, isPaused]);

  // Volume meter animation
  useEffect(() => {
    if (phase === 'recording' && isRecording && !isPaused) {
      volumeIntervalRef.current = setInterval(() => {
        setVolumeLevel(Math.floor(Math.random() * 3) + 2);
      }, 200);
    } else {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    }
    return () => {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    };
  }, [phase, isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressOffset = () => {
    const circumference = 339.292;
    return circumference - (prepTime / 58) * circumference;
  };

  const startRecording = () => {
    setPhase('recording');
    setIsRecording(true);
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
    }
    alert('Recording stopped! Would show playback interface.');
    navigate(`/test/${id}/results`);
  };

  const rerecord = () => {
    if (rerecordAttempts > 0) {
      setRecordTime(120);
      setIsRecording(true);
      setIsPaused(false);
      setRerecordAttempts(prev => prev - 1);
    }
  };

  return (
    <div className="speaking-test-page">
      <TestNavigation currentSection="speaking" completedSections={['listening', 'reading', 'writing']} />
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
          EnglishTest Pro
        </div>
        <div className="breadcrumb">
          <div className="breadcrumb-item">Dashboard</div>
          <i className="fas fa-chevron-right"></i>
          <div className="breadcrumb-item">Speaking Test</div>
          <i className="fas fa-chevron-right"></i>
          <div className="breadcrumb-item active">Part {currentPart}</div>
        </div>
        <div className="nav-right">
          <div className="nav-icon">
            <i className="fas fa-bell"></i>
          </div>
          <div className="nav-icon">
            <i className="fas fa-cog"></i>
          </div>
          <div className="user-avatar">NA</div>
        </div>
      </div>

      {/* Progress Header */}
      <div className="progress-header">
        <div className="skill-badge">
          <i className="fas fa-microphone"></i>
          Speaking Test
        </div>
        <div className="progress-section">
          <div className="progress-label">Part {currentPart} of 3</div>
          <div className="progress-bar-container">
            {testData.parts.map((part) => (
              <div
                key={part.id}
                className={`progress-segment ${part.status}`}
                data-part={part.name}
              ></div>
            ))}
          </div>
        </div>
        <div className="timer-display">
          <div className="timer-value">
            <i className="fas fa-clock"></i>
            <span>{formatTime(mainTime)}</span>
          </div>
          <div className="timer-label-small">remaining</div>
        </div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        {/* Left Column */}
        <div className="left-column">
          {/* Preparation Phase */}
          {phase === 'preparation' && (
            <div className="preparation-phase">
              <div className="prompt-card">
                <div className="card-header">
                  <h2 className="card-title">
                    Part {testData.currentPrompt.part}: {testData.currentPrompt.title}
                  </h2>
                  <span className="cue-badge">Cue Card</span>
                </div>

                <div className="prompt-question">
                  {testData.currentPrompt.question}
                </div>

                <ul className="prompt-points">
                  {testData.currentPrompt.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>

                <div className="preparation-section">
                  <div className="prep-label">Preparation Time</div>
                  <div className="timer-circle">
                    <svg className="circular-progress" width="120" height="120" viewBox="0 0 120 120">
                      <circle className="progress-ring-bg" cx="60" cy="60" r="54"></circle>
                      <circle
                        className="progress-ring-fill"
                        cx="60"
                        cy="60"
                        r="54"
                        strokeDasharray="339.292"
                        strokeDashoffset={getProgressOffset()}
                      ></circle>
                    </svg>
                    <div className="timer-countdown">{formatTime(prepTime)}</div>
                  </div>
                  <div className="prep-instruction">Use this time to organize your thoughts</div>
                </div>

                <div className="notes-area">
                  <div className="notes-header">
                    <div className="notes-label">Your Notes</div>
                    <div className="char-count">
                      <span>{notesText.length}</span> / 200
                    </div>
                  </div>
                  <textarea
                    className="notes-textarea"
                    placeholder="Make brief notes here... (optional)"
                    maxLength="200"
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                  />
                </div>

                <div className="info-box">
                  <i className="fas fa-lightbulb"></i>
                  <div className="info-text">
                    Tip: In the actual test, you'll receive a physical cue card with these prompts
                  </div>
                </div>

                <button
                  className="ready-button"
                  onClick={startRecording}
                  disabled={prepTime > 0}
                  style={prepTime <= 0 ? { animation: 'pulse 2s ease-in-out infinite' } : {}}
                >
                  <i className="fas fa-microphone"></i>
                  I'm Ready to Speak
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Recording Phase */}
          {phase === 'recording' && (
            <div className="recording-phase">
              <div className="compact-prompt">
                <div className="compact-title">Your Topic</div>
                <div className="compact-text">{testData.currentPrompt.question}</div>
              </div>

              <div className="record-container">
                <button className={`record-button ${isRecording && !isPaused ? 'recording' : ''}`}>
                  <i className={`fas fa-${isPaused ? 'pause' : 'microphone'}`}></i>
                </button>

                <div className="recording-timer">
                  <span className="current">{formatTime(recordTime)}</span> / 2:00
                </div>

                {isRecording && !isPaused && (
                  <div className="recording-status">
                    <div className="recording-dot"></div>
                    Recording...
                  </div>
                )}

                {isPaused && (
                  <div className="recording-status paused">
                    <i className="fas fa-pause-circle"></i>
                    Paused
                  </div>
                )}
              </div>

              <div className="waveform-container">
                {waveformHeights.map((height, index) => (
                  <div
                    key={index}
                    className="wave-bar"
                    style={{ height: `${height}px` }}
                  ></div>
                ))}
              </div>

              <div className="volume-meter">
                <i className="fas fa-volume-up volume-icon"></i>
                <div className="volume-bars">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className={`volume-bar ${bar <= volumeLevel ? 'active' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="recording-controls">
                <button className="control-btn pause-btn" onClick={pauseRecording}>
                  <i className={`fas fa-${isPaused ? 'play' : 'pause'}`}></i>
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className="control-btn stop-btn" onClick={stopRecording}>
                  <i className="fas fa-stop"></i>
                  Stop Early
                </button>
              </div>

              <div className="hints-container">
                <div className="hint-item success">
                  <i className="fas fa-check-circle"></i>
                  Volume level is good
                </div>
                <div className="hint-item">
                  <i className="fas fa-info-circle"></i>
                  Speak clearly and at a natural pace
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="criteria-card">
            <div className="criteria-header">
              <i className="fas fa-clipboard-list"></i>
              Assessment Criteria
            </div>
            <div className="divider"></div>

            {testData.criteria.map((criterion, index) => (
              <div key={index} className="criteria-item">
                <div className="criteria-name">
                  {criterion.name}
                  <span className="score-badge">{criterion.score}</span>
                </div>
                <div className="criteria-desc">{criterion.description}</div>
              </div>
            ))}

            <div className="tips-section">
              <div className="tips-heading">Quick Tips</div>
              {testData.tips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <i className="fas fa-check"></i>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <div className="test-info-panel">
            <div className="info-heading">Test Details</div>
            {testData.testDetails.map((detail, index) => (
              <div key={index} className="info-item">
                <span className="info-label">{detail.label}</span>
                <span className="info-value">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakingTest;
