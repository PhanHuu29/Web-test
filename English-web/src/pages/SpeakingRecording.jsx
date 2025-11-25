import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/SpeakingRecording.css';

function SpeakingRecording() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [recordTime, setRecordTime] = useState(105); // 1:45
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(4);
  const [wordCount, setWordCount] = useState(145);
  const [pauseCount, setPauseCount] = useState(3);
  const [waveformHeights, setWaveformHeights] = useState(
    Array(20).fill(0).map(() => Math.random() * 60 + 20)
  );
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const recordIntervalRef = useRef(null);
  const waveformIntervalRef = useRef(null);
  const volumeIntervalRef = useRef(null);
  const wordCountIntervalRef = useRef(null);

  // Test data
  const testData = {
    currentPart: 2,
    totalParts: 3,
    topic: 'Describe a place you like to visit',
    fullPrompt: {
      question: 'Describe a place you like to visit',
      points: [
        'Where it is',
        'How often you go there',
        'What you do there',
        'And explain why you like this place'
      ]
    },
    criteria: [
      { icon: 'comments', name: 'Fluency & Coherence' },
      { icon: 'book', name: 'Lexical Resource' },
      { icon: 'spell-check', name: 'Grammatical Range' },
      { icon: 'volume-high', name: 'Pronunciation' }
    ],
    tips: [
      'Remember to elaborate on each point',
      'Use linking words to connect ideas',
      'Don\'t worry about perfect grammar'
    ]
  };

  // Recording timer countdown
  useEffect(() => {
    if (isRecording && !isPaused) {
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
  }, [isRecording, isPaused]);

  // Waveform animation
  useEffect(() => {
    if (isRecording && !isPaused) {
      waveformIntervalRef.current = setInterval(() => {
        setWaveformHeights(
          Array(20).fill(0).map(() => Math.random() * 60 + 20)
        );
      }, 120);
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
  }, [isRecording, isPaused]);

  // Volume meter animation
  useEffect(() => {
    if (isRecording && !isPaused) {
      volumeIntervalRef.current = setInterval(() => {
        setVolumeLevel(Math.floor(Math.random() * 3) + 2);
      }, 180);
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
  }, [isRecording, isPaused]);

  // Word count simulation
  useEffect(() => {
    if (isRecording && !isPaused) {
      wordCountIntervalRef.current = setInterval(() => {
        setWordCount(prev => prev + Math.floor(Math.random() * 3));
      }, 2000);
    } else {
      if (wordCountIntervalRef.current) {
        clearInterval(wordCountIntervalRef.current);
      }
    }
    return () => {
      if (wordCountIntervalRef.current) {
        clearInterval(wordCountIntervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressOffset = () => {
    const circumference = 616;
    const progress = 1 - (recordTime / 120);
    return circumference * progress;
  };

  const getAveragePace = () => {
    const minutesSpoken = (120 - recordTime) / 60;
    if (minutesSpoken === 0) return 0;
    return Math.round(wordCount / minutesSpoken);
  };

  const getVolumeLabel = () => {
    if (volumeLevel >= 4) return 'Good';
    if (volumeLevel >= 3) return 'Moderate';
    return 'Low';
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
    if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
    if (wordCountIntervalRef.current) clearInterval(wordCountIntervalRef.current);
    
    alert('Recording stopped! Would show playback interface.');
    navigate(`/test/${id}/results`);
  };

  const toggleFullPrompt = () => {
    if (!showFullPrompt) {
      const promptText = `${testData.fullPrompt.question}\n\n${testData.fullPrompt.points.map(p => `• ${p}`).join('\n')}`;
      alert(promptText);
    }
    setShowFullPrompt(!showFullPrompt);
  };

  return (
    <div className="speaking-recording-page">
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
          <div className="breadcrumb-item active">Recording</div>
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
          <div className="progress-label">Part {testData.currentPart} of {testData.totalParts} - Recording</div>
          <div className="progress-bar-container">
            <div className="progress-segment completed"></div>
            <div className="progress-segment active"></div>
            <div className="progress-segment"></div>
          </div>
        </div>
        <div className="timer-display">
          <div className="timer-value">
            <i className="fas fa-clock"></i>
            <span>{formatTime(recordTime)}</span>
          </div>
          <div className="timer-label-small">speaking time</div>
        </div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        {/* Recording Phase */}
        <div className="recording-phase">
          {/* Compact Prompt */}
          <div className="compact-prompt">
            <div className="prompt-icon">
              <i className="fas fa-comment-dots"></i>
            </div>
            <div className="prompt-content">
              <div className="prompt-label">Your Topic</div>
              <div className="prompt-text">{testData.topic}</div>
            </div>
            <button className="expand-prompt" onClick={toggleFullPrompt}>
              View full prompt
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>

          {/* Recording Interface */}
          <div className="recording-interface">
            {/* Microphone Button */}
            <div className="mic-container">
              <div className="progress-ring-wrapper">
                <svg className="circular-progress" viewBox="0 0 196 196">
                  <circle className="progress-ring-bg" cx="98" cy="98" r="94"></circle>
                  <circle
                    className="progress-ring-fill"
                    cx="98"
                    cy="98"
                    r="94"
                    strokeDasharray="616"
                    strokeDashoffset={getProgressOffset()}
                  ></circle>
                </svg>
              </div>
              <button className={`mic-button ${isRecording && !isPaused ? 'recording' : ''}`}>
                <i className={`fas fa-${isPaused ? 'pause' : 'microphone'}`}></i>
              </button>
            </div>

            {/* Timer Display */}
            <div className="recording-timer">
              <span className="current">{formatTime(recordTime)}</span>
              <span className="total"> / 2:00</span>
            </div>

            {/* Recording Status */}
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

            {/* Waveform Visualization */}
            <div className="waveform-container">
              {waveformHeights.map((height, index) => (
                <div
                  key={index}
                  className="wave-bar"
                  style={{ height: `${height}px` }}
                ></div>
              ))}
            </div>

            {/* Volume Meter */}
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
              <span className="volume-label">{getVolumeLabel()}</span>
            </div>

            {/* Control Buttons */}
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

            {/* Feedback Hints */}
            <div className="feedback-hints">
              <div className="hint-item success">
                <i className="fas fa-check-circle"></i>
                Volume detected
              </div>
              <div className="hint-item active">
                <i className="fas fa-waveform-lines"></i>
                Speech detected
              </div>
              <div className="hint-item success">
                <i className="fas fa-check"></i>
                Clear audio quality
              </div>
            </div>

            {/* Ambient Hints */}
            <div className="ambient-hints">
              <div className="ambient-hint">Speak naturally at your own pace</div>
              <div className="ambient-hint">You can stop early if you finish before 2:00</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Simplified Criteria */}
          <div className="criteria-card">
            <div className="criteria-header">
              <i className="fas fa-bullseye"></i>
              Assessment Focus
            </div>
            <div className="divider"></div>

            {testData.criteria.map((criterion, index) => (
              <div key={index} className="criteria-item-simple">
                <div className="criteria-icon">
                  <i className={`fas fa-${criterion.icon}`}></i>
                </div>
                <div className="criteria-name-simple">{criterion.name}</div>
              </div>
            ))}
          </div>

          {/* Recording Stats */}
          <div className="recording-stats">
            <div className="stats-header">
              <i className="fas fa-chart-line"></i>
              Live Stats
            </div>

            <div className="stat-item">
              <span className="stat-label">Words spoken</span>
              <span className="stat-value">~{wordCount}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Speaking time</span>
              <span className="stat-value">{formatTime(120 - recordTime)}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Pause count</span>
              <span className="stat-value">{pauseCount}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Average pace</span>
              <span className="stat-value good">{getAveragePace()} wpm</span>
            </div>
          </div>

          {/* Tips During Recording */}
          <div className="tips-panel">
            <div className="tips-heading">Tips</div>
            {testData.tips.map((tip, index) => (
              <div key={index} className="tip-item-sidebar">
                <i className="fas fa-check"></i>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakingRecording;
