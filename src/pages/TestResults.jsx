import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TestResults.css';

const TestResults = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Sample results data
    const resultsData = {
        overallScore: 85,
        maxScore: 100,
        skills: [
            {
                name: 'Listening',
                icon: 'fa-headphones',
                score: 28,
                maxScore: 30,
                className: 'listening',
                stats: [
                    { label: 'Accuracy', value: '93%' },
                    { label: 'Time Taken', value: '45 min' }
                ],
                subScores: [
                    { label: 'Short Conv.', value: '9/10' },
                    { label: 'Long Conv.', value: '10/10' },
                    { label: 'Lectures', value: '9/10' }
                ],
                comment: 'Excellent comprehension of natural speech patterns and academic content.'
            },
            {
                name: 'Reading',
                icon: 'fa-book-open',
                score: 27,
                maxScore: 30,
                className: 'reading',
                stats: [
                    { label: 'Accuracy', value: '90%' },
                    { label: 'Time Taken', value: '50 min' }
                ],
                subScores: [
                    { label: 'Main Ideas', value: '10/10' },
                    { label: 'Details', value: '8/10' },
                    { label: 'Inference', value: '9/10' }
                ],
                comment: 'Strong ability to identify main ideas and make logical inferences.'
            },
            {
                name: 'Writing',
                icon: 'fa-pen',
                score: 24,
                maxScore: 30,
                className: 'writing',
                stats: [
                    { label: 'Coherence', value: '85%' },
                    { label: 'Grammar', value: '88%' }
                ],
                subScores: [
                    { label: 'Task Response', value: '8/10' },
                    { label: 'Coherence', value: '8/10' },
                    { label: 'Vocabulary', value: '8/10' }
                ],
                comment: 'Good organization and vocabulary range. Focus on complex sentence structures.'
            },
            {
                name: 'Speaking',
                icon: 'fa-microphone',
                score: 26,
                maxScore: 30,
                className: 'speaking',
                stats: [
                    { label: 'Fluency', value: '87%' },
                    { label: 'Pronunciation', value: '90%' }
                ],
                subScores: [
                    { label: 'Fluency', value: '9/10' },
                    { label: 'Pronunciation', value: '9/10' },
                    { label: 'Vocabulary', value: '8/10' }
                ],
                comment: 'Natural delivery with clear pronunciation. Excellent topic development.',
                hasAudio: true
            }
        ],
        strengths: [
            'Excellent listening comprehension across various accents',
            'Strong vocabulary range in both formal and informal contexts',
            'Natural pronunciation and intonation patterns',
            'Ability to understand complex academic texts'
        ],
        improvements: [
            'Use more complex grammatical structures in writing',
            'Improve speed in reading comprehension tasks',
            'Expand use of idiomatic expressions in speaking',
            'Work on paraphrasing skills for summarization tasks'
        ],
        resources: [
            {
                icon: 'fa-book',
                title: 'Advanced Grammar Guide',
                description: 'Master complex sentence structures and advanced grammatical patterns'
            },
            {
                icon: 'fa-headphones',
                title: 'Listening Practice Hub',
                description: 'Practice with authentic materials from academic lectures and conversations'
            },
            {
                icon: 'fa-comments',
                title: 'Speaking Club',
                description: 'Join our community to practice speaking with native speakers and peers'
            }
        ],
        nextSteps: [
            {
                icon: '📚',
                title: 'Review Mistakes',
                description: 'Go through detailed explanations'
            },
            {
                icon: '🎯',
                title: 'Practice More',
                description: 'Take topic-specific tests'
            },
            {
                icon: '📊',
                title: 'Track Progress',
                description: 'View your improvement over time'
            },
            {
                icon: '👥',
                title: 'Get Coaching',
                description: 'Book a session with an expert'
            }
        ]
    };

    useEffect(() => {
        // Create confetti animation
        createConfetti();

        // Animate percentile bar
        setTimeout(() => {
            const percentileFill = document.querySelector('.percentile-fill');
            if (percentileFill) {
                percentileFill.style.width = '67%';
            }
        }, 500);
    }, []);

    const createConfetti = () => {
        const container = document.getElementById('confettiContainer');
        if (!container) return;

        const colors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
        }
    };

    return (
        <div className="test-results-page">
            {/* Header */}
            <div className="header">
                <div className="logo">English Mastery</div>
                <div className="header-actions">
                    <button className="header-btn" onClick={() => navigate('/dashboard')}>
                        <i className="fas fa-home"></i>
                        Dashboard
                    </button>
                    <button className="header-btn" onClick={() => navigate(`/test/${id}`)}>
                        <i className="fas fa-redo"></i>
                        Retake Test
                    </button>
                </div>
            </div>

            {/* Main Container */}
            <div className="main-container">
                <div className="results-layout">
                    <div className="layout-column hero-column">
                        <section className="section-card hero-section">
                            <div className="confetti-container" id="confettiContainer"></div>

                            <h1 className="hero-title">
                                <span className="celebration-emoji">🎉</span>
                                Test Complete!
                            </h1>
                            <p className="hero-subtitle">
                                Congratulations! You've completed all sections of your English proficiency test.
                            </p>

                            <div className="overall-score">
                                <div className="score-label">Overall Score</div>
                                <div className="score-value">{resultsData.overallScore}</div>
                                <div className="score-max">/ {resultsData.maxScore}</div>
                            </div>
                        </section>

                        <section className="section-card score-section">
                            <div className="section-title">
                                <i className="fas fa-chart-bar"></i>
                                Score Breakdown
                            </div>

                            <div className="scores-grid">
                                {resultsData.skills.map((skill, index) => (
                                    <div key={index} className={`skill-card ${skill.className}`}>
                                        <div className="skill-header">
                                            <div className="skill-name">
                                                <div className="skill-icon">
                                                    <i className={`fas ${skill.icon}`}></i>
                                                </div>
                                                {skill.name}
                                            </div>
                                            <div className="skill-score">
                                                {skill.score}<span className="max">/{skill.maxScore}</span>
                                            </div>
                                        </div>

                                        <div className="skill-stats">
                                            {skill.stats.map((stat, idx) => (
                                                <div key={idx} className="stat-row">
                                                    <span className="stat-label">{stat.label}</span>
                                                    <span className="stat-value">{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="sub-scores">
                                            {skill.subScores.map((subScore, idx) => (
                                                <div key={idx} className="sub-score-item">
                                                    <div className="sub-score-label">{subScore.label}</div>
                                                    <div className="sub-score-value">{subScore.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="skill-comment">{skill.comment}</div>

                                        {skill.hasAudio && (
                                            <div className="audio-playback">
                                                <button className="play-mini-btn">
                                                    <i className="fas fa-play"></i>
                                                </button>
                                                <div className="audio-timeline">
                                                    <div className="audio-progress"></div>
                                                </div>
                                                <span className="audio-time">0:42 / 2:00</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="layout-column feedback-column">
                        <section className="section-card feedback-section">
                            <div className="section-title">
                                <i className="fas fa-lightbulb"></i>
                                Detailed Feedback
                            </div>

                            <div className="feedback-grid">
                                <div className="feedback-column strengths">
                                    <h3>
                                        <i className="fas fa-check-circle"></i>
                                        Strengths
                                    </h3>
                                    <div className="feedback-list">
                                        {resultsData.strengths.map((strength, index) => (
                                            <div key={index} className="feedback-item strength">
                                                <i className="fas fa-star feedback-icon"></i>
                                                <span className="feedback-text">{strength}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="feedback-column improvements">
                                    <h3>
                                        <i className="fas fa-arrow-up"></i>
                                        Areas for Improvement
                                    </h3>
                                    <div className="feedback-list">
                                        {resultsData.improvements.map((improvement, index) => (
                                            <div key={index} className="feedback-item improvement">
                                                <i className="fas fa-chart-line feedback-icon"></i>
                                                <span className="feedback-text">{improvement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="layout-column insights-column">
                        <section className="section-card comparison-section">
                            <p className="comparison-label">You scored better than</p>
                            <p className="comparison-value"><span className="highlight">67%</span> of test takers</p>
                            <div className="percentile-bar">
                                <div className="percentile-fill">
                                    <div className="percentile-marker">🎯</div>
                                </div>
                            </div>
                        </section>

                        <section className="section-card resources-section">
                            <div className="section-title">
                                <i className="fas fa-graduation-cap"></i>
                                Recommended Resources
                            </div>

                            <div className="resources-grid">
                                {resultsData.resources.map((resource, index) => (
                                    <div key={index} className="resource-card">
                                        <div className="resource-icon">
                                            <i className={`fas ${resource.icon}`}></i>
                                        </div>
                                        <div className="resource-title">{resource.title}</div>
                                        <div className="resource-desc">{resource.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="layout-column next-steps-column">
                        <section className="section-card actions-section">
                            <div className="section-title">
                                <i className="fas fa-rocket"></i>
                                Quick Actions
                            </div>

                            <div className="actions-list">
                                <button className="action-card primary" onClick={() => navigate('/dashboard')}>
                                    <i className="fas fa-arrow-left"></i>
                                    Back to Dashboard
                                </button>
                                <button className="action-card" onClick={() => navigate(`/test/${id}`)}>
                                    <i className="fas fa-redo"></i>
                                    Retake Test
                                </button>
                                <button className="action-card">
                                    <i className="fas fa-download"></i>
                                    Download Report
                                </button>
                                <button className="action-card">
                                    <i className="fas fa-share-alt"></i>
                                    Share Results
                                </button>
                            </div>
                        </section>

                        <section className="section-card next-section">
                            <div className="section-title">
                                <i className="fas fa-route"></i>
                                What's Next?
                            </div>
                            <p className="next-subtitle">Continue your learning journey with these recommended actions</p>

                            <div className="next-grid">
                                {resultsData.nextSteps.map((step, index) => (
                                    <div key={index} className="next-card">
                                        <div className="next-card-icon">{step.icon}</div>
                                        <div className="next-card-title">{step.title}</div>
                                        <div className="next-card-desc">{step.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResults;
