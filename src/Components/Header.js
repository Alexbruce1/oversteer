import React from "react";
import './Header.css';

function Header() {
  return (
    <header className="Header">
      <div className="top-header">
        <a href="/" className="app-title">
          over<b>steer</b>
        </a>
      </div>
      <div className="link-container">
        <a href="/" className="header-link">Home</a>
      </div>
    </header>
  )
}

export default Header;