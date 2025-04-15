import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SimulationPage from './pages/SimulationPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<div><h2>404 Not Found</h2><p>Oops! That page doesn't exist.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;