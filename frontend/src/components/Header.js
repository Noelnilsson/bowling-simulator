import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import './Header.css'; // Styles for the header

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <NavLink to="/">Noel Nilsson</NavLink>
        </div>
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} end>Home</NavLink></li>
            <li><NavLink to="/simulation" className={({ isActive }) => isActive ? 'active-link' : ''} end>Simulation</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;