import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Simple components for testing
const Home = () => <div style={{color: 'white'}}>Home Page</div>;
const About = () => <div style={{color: 'white'}}>About Page</div>;
const Contact = () => <div style={{color: 'white'}}>Contact Page</div>;

const TestApp = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Test Router App</h1>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
          <li><Link to="/about" style={{ color: 'white' }}>About</Link></li>
          <li><Link to="/contact" style={{ color: 'white' }}>Contact</Link></li>
        </ul>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default TestApp; 