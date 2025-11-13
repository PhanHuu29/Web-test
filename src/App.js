import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TestDetail from './pages/TestDetail';
import TestUI from './pages/TestUI';
import ListeningTest from './pages/ListeningTest';
import WritingTest from './pages/WritingTest';
import SpeakingTest from './pages/SpeakingTest';
import SpeakingRecording from './pages/SpeakingRecording';
import TestResults from './pages/TestResults';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/:id" element={<TestDetail />} />
          <Route path="/test/:id/start" element={<TestUI />} />
          <Route path="/test/:id/listening" element={<ListeningTest />} />
          <Route path="/test/:id/writing" element={<WritingTest />} />
          <Route path="/test/:id/speaking" element={<SpeakingTest />} />
          <Route path="/test/:id/speaking/recording" element={<SpeakingRecording />} />
          <Route path="/test/:id/results" element={<TestResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
