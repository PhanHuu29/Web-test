import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TestPreview from '../components/TestPreview';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Features />
      <TestPreview />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default Home;
