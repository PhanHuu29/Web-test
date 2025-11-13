import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [validation, setValidation] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [passwordStrength, setPasswordStrength] = useState('');

  // Validate fullname
  useEffect(() => {
    setValidation(prev => ({
      ...prev,
      fullname: formData.fullname.trim().length >= 3
    }));
  }, [formData.fullname]);

  // Validate email
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation(prev => ({
      ...prev,
      email: emailPattern.test(formData.email)
    }));
  }, [formData.email]);

  // Check password strength
  useEffect(() => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (password.length === 0) {
      setPasswordStrength('');
    } else if (strength <= 1) {
      setPasswordStrength('weak');
    } else if (strength <= 2) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }

    setValidation(prev => ({
      ...prev,
      password: password.length >= 8
    }));
  }, [formData.password]);

  // Check password match
  useEffect(() => {
    setValidation(prev => ({
      ...prev,
      confirmPassword: formData.password === formData.confirmPassword && formData.confirmPassword.length >= 8
    }));
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isFormValid = () => {
    return validation.fullname && 
           validation.email && 
           validation.password && 
           validation.confirmPassword && 
           formData.terms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration data:', formData);
      // Move to next step or redirect
      navigate('/dashboard');
    }, 1500);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Handle social signup
  };

  const getPasswordStrengthText = () => {
    if (!passwordStrength) return 'Chưa nhập';
    if (passwordStrength === 'weak') return 'Yếu';
    if (passwordStrength === 'medium') return 'Trung bình';
    return 'Mạnh';
  };

  return (
    <div className="register-page">
      {/* Background decorative elements */}
      <div className="bg-shapes">
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-text">ENGLISH</div>
        <div className="bg-text">TEST</div>
      </div>

      {/* Header */}
      <header className="register-header">
        <div className="header-content">
          <a href="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">EnglishTest <span>Pro</span></div>
          </a>
          <div className="language-selector">
            <button className="language-btn">
              <span className="flag">🇻🇳</span>
              <span>Tiếng Việt</span>
              <i className="fas fa-chevron-down" style={{fontSize: '12px'}}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="register-main">
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-header">
              <h1>Tạo tài khoản mới</h1>
              <p>Bắt đầu hành trình chinh phục tiếng Anh của bạn</p>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              <div className="progress-line">
                <div 
                  className="progress-line-fill" 
                  style={{width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'}}
                ></div>
              </div>
              <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="step-circle">
                  {currentStep > 1 ? <i className="fas fa-check"></i> : <span>1</span>}
                </div>
                <div className="step-label">Thông tin cơ bản</div>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <div className="step-circle">
                  {currentStep > 2 ? <i className="fas fa-check"></i> : <span>2</span>}
                </div>
                <div className="step-label">Mục tiêu học tập</div>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-circle">
                  <span>3</span>
                </div>
                <div className="step-label">Hoàn thành</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullname">Họ và tên</label>
                <div className="input-wrapper">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={formData.fullname ? (validation.fullname ? 'valid' : 'invalid') : ''}
                    required
                  />
                  <i className={`fas fa-check-circle validation-icon ${validation.fullname ? 'valid' : ''}`}></i>
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={formData.email ? (validation.email ? 'valid' : 'invalid') : ''}
                    required
                  />
                  <i className={`fas fa-check-circle validation-icon ${validation.email ? 'valid' : ''}`}></i>
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Tối thiểu 8 ký tự"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-label">
                      Độ mạnh mật khẩu: <span id="strengthText">{getPasswordStrengthText()}</span>
                    </div>
                    <div className="strength-bar">
                      <div className={`strength-fill ${passwordStrength}`}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={formData.confirmPassword ? (validation.confirmPassword ? 'valid' : 'invalid') : ''}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className={`match-indicator show ${validation.confirmPassword ? 'match' : 'no-match'}`}>
                    <i className={`fas ${validation.confirmPassword ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    <span>{validation.confirmPassword ? 'Mật khẩu khớp' : 'Mật khẩu không khớp'}</span>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="terms-group">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                  />
                  <span className="terms-text">
                    Tôi đồng ý với <a href="/terms">Điều khoản sử dụng</a> và <a href="/privacy">Chính sách bảo mật</a>
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className={`btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={!isFormValid()}
              >
                <span>Tiếp tục</span>
                <i className="fas fa-arrow-right"></i>
                <span className="spinner"></span>
              </button>
            </form>

            <div className="divider">hoặc đăng ký nhanh với</div>

            <div className="social-login">
              <button className="social-btn google" onClick={() => handleSocialSignup('google')}>
                <i className="fab fa-google"></i>
                <span>Google</span>
              </button>
              <button className="social-btn facebook" onClick={() => handleSocialSignup('facebook')}>
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </button>
              <button className="social-btn apple" onClick={() => handleSocialSignup('apple')}>
                <i className="fab fa-apple"></i>
                <span>Apple</span>
              </button>
            </div>

            <div className="login-prompt">
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </div>

            {/* Security Badges */}
            <div className="security-badges">
              <div className="security-badge">
                <i className="fas fa-shield-alt"></i>
                <span>Bảo mật SSL</span>
              </div>
              <div className="security-badge">
                <i className="fas fa-lock"></i>
                <span>Dữ liệu được mã hóa</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
