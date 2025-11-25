import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigation from '../components/TestNavigation';
import '../styles/WritingTest.css';

function WritingTest() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State management
  const [activeTask, setActiveTask] = useState(1);
  const [essayText, setEssayText] = useState(`The bar chart illustrates the proportion of renewable energy consumption across five nations over a decade from 2010 to 2020.

Overall, it is evident that all countries experienced an upward trend in their renewable energy usage during this period. Sweden consistently maintained the highest percentage throughout, while the United States showed the most significant growth.

In 2010, Sweden led with approximately 45% renewable energy consumption, followed by Germany at 20%. By 2020, Sweden had increased to nearly 60%, representing the highest figure among all nations. Germany also demonstrated steady growth, reaching about 38% by the end of the period.

The United States started at a relatively low 8% in 2010 but showed remarkable progress, increasing to 22% by 2020. This represents the largest percentage increase among the five countries. Similarly, China and Japan both experienced moderate growth from 10% and 12% to 25% and 20% respectively.`);
  const [timeRemaining, setTimeRemaining] = useState(2295); // 38:15
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);
  const [expandedTips, setExpandedTips] = useState([0]);
  const [expandedCategories, setExpandedCategories] = useState([0]);
  const [activeStructure, setActiveStructure] = useState(2);
  const [lastSaved, setLastSaved] = useState(5);

  // Test data
  const testData = {
    task1: {
      title: 'Task 1: Academic Writing',
      imageUrl: 'https://storage.googleapis.com/forge-sites/c7bb40b1ee7b6dd30640c2bd7dcaa939b3307710972c34dde225d40e711d7df1.webp',
      question: 'The chart below shows the percentage of renewable energy consumption in five countries between 2010 and 2020.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      minWords: 150
    },
    structure: [
      { id: 0, name: 'Introduction', words: 28, status: 'complete' },
      { id: 1, name: 'Overview', words: 42, status: 'complete' },
      { id: 2, name: 'Body Paragraph 1', words: 51, status: 'active' },
      { id: 3, name: 'Body Paragraph 2', words: 26, status: 'incomplete' },
      { id: 4, name: 'Conclusion', words: 0, status: 'incomplete' }
    ],
    tips: [
      {
        title: 'Task 1 Overview',
        content: 'Start with a clear overview statement. Identify the main trends without including specific data in the overview.'
      },
      {
        title: 'Data Description',
        content: 'Use comparative language and include specific figures from the graph to support your points.'
      },
      {
        title: 'Language Variety',
        content: 'Vary your vocabulary and sentence structures. Avoid repeating the same words and phrases.'
      }
    ],
    checklist: [
      { text: 'Describe overall trend', status: 'complete' },
      { text: 'Include key features (min 2)', status: 'complete' },
      { text: 'Provide data support - needs more examples', status: 'warning' },
      { text: 'Write conclusion', status: 'incomplete' },
      { text: 'Check word count - 3 more words needed', status: 'warning' }
    ],
    vocabularyAlerts: [
      {
        word: 'increase',
        count: 4,
        synonyms: ['rise', 'grow', 'surge', 'expand', 'climb']
      },
      {
        word: 'show',
        count: 3,
        synonyms: ['demonstrate', 'illustrate', 'reveal', 'indicate']
      }
    ],
    grammarPatterns: [
      {
        category: 'Introducing Data',
        patterns: ['The chart illustrates that...', 'According to the data...', 'It is evident that...']
      },
      {
        category: 'Comparing',
        patterns: ['In comparison to...', 'Similarly...', 'Likewise...']
      },
      {
        category: 'Contrasting',
        patterns: ['On the other hand...', 'In contrast...', 'However...']
      },
      {
        category: 'Concluding',
        patterns: ['In conclusion...', 'To summarize...', 'Overall...']
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
    const saveInterval = setInterval(() => {
      setLastSaved(0);
      const countdown = setInterval(() => {
        setLastSaved(prev => prev + 1);
      }, 1000);
      
      setTimeout(() => clearInterval(countdown), 60000);
    }, 60000);

    return () => clearInterval(saveInterval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWordCount = () => {
    const text = essayText.trim();
    return text ? text.split(/\s+/).length : 0;
  };

  const getCharacterCount = () => {
    return essayText.length;
  };

  const getSentenceCount = () => {
    const sentences = essayText.match(/[^.!?]+[.!?]+/g);
    return sentences ? sentences.length : 0;
  };

  const getReadingTime = () => {
    const words = getWordCount();
    const minutes = Math.ceil(words / 200); // Average reading speed
    return `~${minutes} min`;
  };

  const getProgressPercentage = () => {
    const completedSections = testData.structure.filter(s => s.status === 'complete').length;
    return Math.round((completedSections / testData.structure.length) * 100);
  };

  const handleSubmit = () => {
    const wordCount = getWordCount();
    const minWords = testData.task1.minWords;
    
    if (wordCount < minWords) {
      if (!window.confirm(`You only have ${wordCount} words. Minimum is ${minWords}. Submit anyway?`)) {
        return;
      }
    }
    
    alert('Writing test submitted! Redirecting to results...');
    navigate(`/test/${id}/results`);
  };

  const toggleTip = (index) => {
    setExpandedTips(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleCategory = (index) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const copyToClipboard = (text) => {
    // In real implementation, would use navigator.clipboard.writeText()
    console.log('Copied:', text);
    alert(`Copied: ${text}`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'complete':
        return <i className="fas fa-check-circle"></i>;
      case 'active':
        return <i className="fas fa-arrow-right"></i>;
      default:
        return <i className="fas fa-circle"></i>;
    }
  };

  const getChecklistIcon = (status) => {
    switch(status) {
      case 'complete':
        return <i className="fas fa-check"></i>;
      case 'warning':
        return <i className="fas fa-exclamation"></i>;
      case 'incomplete':
        return <i className="fas fa-times"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="writing-test-page">
      <TestNavigation currentSection="writing" completedSections={['listening', 'reading']} />
      {/* Header */}
      <div className="test-header">
        <div className="test-header-left">
          <div className="logo">English Mastery</div>
          <div className="skill-badge">
            <i className="fas fa-pen"></i>
            Writing Test
          </div>
          <div className="task-tabs">
            <button 
              className={`task-tab ${activeTask === 1 ? 'active' : ''}`}
              onClick={() => setActiveTask(1)}
            >
              Task 1
            </button>
            <button 
              className={`task-tab ${activeTask === 2 ? 'active' : ''}`}
              onClick={() => setActiveTask(2)}
            >
              Task 2
            </button>
          </div>
        </div>
        <div className="test-header-right">
          <div className="word-count-display">
            <div className="word-count-main">
              <span className="current">{getWordCount()}</span> / {testData.task1.minWords}
            </div>
            <div className="word-count-sub">minimum words</div>
          </div>
          <div className="timer-display">
            <i className="fas fa-clock"></i>
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <div className="auto-save">
            <i className="fas fa-cloud-check"></i>
            Saved {lastSaved} seconds ago
          </div>
        </div>
      </div>

      {/* Sidebar Toggle */}
      <button 
        className="sidebar-toggle"
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Main Container */}
      <div className="writing-container">
        {/* Left Sidebar */}
        <div className={`left-sidebar ${!showLeftSidebar ? 'collapsed' : ''}`}>
          {/* Structure Outline */}
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <i className="fas fa-list-ol"></i>
                Essay Structure
              </h3>
            </div>
            
            <div className="structure-list">
              {testData.structure.map((item) => (
                <div
                  key={item.id}
                  className={`structure-item ${item.status}`}
                  onClick={() => setActiveStructure(item.id)}
                >
                  <div className="structure-name">
                    {getStatusIcon(item.status)}
                    {item.name}
                  </div>
                  <div className="structure-words">{item.words} words</div>
                </div>
              ))}
            </div>

            <svg className="progress-ring" width="60" height="60" viewBox="0 0 60 60">
              <circle className="progress-ring-circle" cx="30" cy="30" r="26"></circle>
              <circle 
                className="progress-ring-fill" 
                cx="30" 
                cy="30" 
                r="26" 
                strokeDasharray="163.36" 
                strokeDashoffset={163.36 * (1 - getProgressPercentage() / 100)}
              />
            </svg>
            <div className="progress-text">{getProgressPercentage()}% Complete</div>
          </div>

          {/* Writing Tips */}
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <i className="fas fa-lightbulb"></i>
                Writing Tips
              </h3>
            </div>

            <div className="tips-accordion">
              {testData.tips.map((tip, index) => (
                <div 
                  key={index}
                  className={`tip-item ${expandedTips.includes(index) ? 'expanded' : ''}`}
                >
                  <div className="tip-header" onClick={() => toggleTip(index)}>
                    <span className="tip-header-text">{tip.title}</span>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="tip-content">{tip.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Editor */}
        <div className="center-editor">
          {/* Task Prompt */}
          <div className={`task-prompt ${!showPrompt ? 'collapsed' : ''}`}>
            <div className="prompt-header">
              <div className="prompt-title">{testData.task1.title}</div>
              <button 
                className="hide-prompt-btn"
                onClick={() => setShowPrompt(!showPrompt)}
              >
                <i className={`fas ${showPrompt ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                {showPrompt ? 'Hide prompt' : 'Show prompt'}
              </button>
            </div>
            <div className="prompt-content">
              <div className="prompt-image">
                <img src={testData.task1.imageUrl} alt="Task chart" />
              </div>
              <div className="prompt-text">
                <div className="prompt-question">{testData.task1.question}</div>
                <div className="prompt-instructions">{testData.task1.instructions}</div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <button className="toolbar-btn" title="Bold">
                <i className="fas fa-bold"></i>
              </button>
              <button className="toolbar-btn" title="Italic">
                <i className="fas fa-italic"></i>
              </button>
              <button className="toolbar-btn" title="Underline">
                <i className="fas fa-underline"></i>
              </button>
            </div>
            <div className="toolbar-group">
              <button className="toolbar-btn" title="Bullet List">
                <i className="fas fa-list-ul"></i>
              </button>
              <button className="toolbar-btn" title="Numbered List">
                <i className="fas fa-list-ol"></i>
              </button>
            </div>
            <div className="toolbar-group">
              <button className="toolbar-btn" title="Indent">
                <i className="fas fa-indent"></i>
              </button>
              <button className="toolbar-btn" title="Outdent">
                <i className="fas fa-outdent"></i>
              </button>
            </div>
            <div className="toolbar-group">
              <button className="toolbar-btn" title="Clear Formatting">
                <i className="fas fa-remove-format"></i>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="editor-area">
            <div className="editor-content">
              <textarea
                className="editor-textarea"
                placeholder="Start writing your answer here..."
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
            </div>
          </div>

          {/* Editor Stats */}
          <div className="editor-stats">
            <div className="stat-item">
              <i className="fas fa-book-open"></i>
              Reading time: <span className="stat-value">{getReadingTime()}</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-chart-line"></i>
              Readability: <span className="stat-value">Grade 8</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-keyboard"></i>
              Speed: <span className="stat-value">1.2 words/min</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Task Requirements Checklist */}
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <i className="fas fa-clipboard-check"></i>
                Task Requirements
              </h3>
            </div>

            <div className="checklist-items">
              {testData.checklist.map((item, index) => (
                <div key={index} className={`checklist-item ${item.status}`}>
                  <div className="checklist-checkbox">
                    {getChecklistIcon(item.status)}
                  </div>
                  <div className="checklist-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Helper */}
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <i className="fas fa-spell-check"></i>
                Vocabulary Helper
              </h3>
            </div>

            {testData.vocabularyAlerts.map((alert, index) => (
              <div key={index} className="vocab-alert">
                <div className="vocab-alert-text">
                  {index === 0 ? "You've used" : "Consider varying"}{' '}
                  <span className="vocab-word">"{alert.word}"</span>{' '}
                  {alert.count} times. Try these alternatives:
                </div>
                <div className="synonym-tags">
                  {alert.synonyms.map((synonym, sIndex) => (
                    <div 
                      key={sIndex}
                      className="synonym-tag"
                      onClick={() => copyToClipboard(synonym)}
                    >
                      {synonym} <i className="fas fa-copy"></i>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Grammar Patterns */}
          <div className="sidebar-section">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <i className="fas fa-language"></i>
                Grammar Patterns
              </h3>
            </div>

            <div className="pattern-categories">
              {testData.grammarPatterns.map((category, catIndex) => (
                <div 
                  key={catIndex}
                  className={`pattern-category ${expandedCategories.includes(catIndex) ? 'expanded' : ''}`}
                >
                  <div 
                    className="category-header"
                    onClick={() => toggleCategory(catIndex)}
                  >
                    {category.category}
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="pattern-list">
                    {category.patterns.map((pattern, pIndex) => (
                      <div 
                        key={pIndex}
                        className="pattern-item"
                        onClick={() => copyToClipboard(pattern)}
                      >
                        {pattern} <i className="fas fa-copy"></i>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-bar-left">
          <button className="nav-btn" onClick={() => navigate('/dashboard')}>
            <i className="fas fa-arrow-left"></i>
            Previous Task
          </button>
          <button className="nav-btn">
            Next Task
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="bottom-bar-right">
          <div className="writing-metrics">
            Characters: <strong>{getCharacterCount()}</strong> | Sentences: <strong>{getSentenceCount()}</strong>
          </div>
          <button className="save-btn">
            <i className="fas fa-save"></i>
            Save Draft
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            <i className="fas fa-paper-plane"></i>
            Submit Writing
          </button>
        </div>
      </div>
    </div>
  );
}

export default WritingTest;
