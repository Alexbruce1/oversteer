import React from "react";
import helmetLogo from "../assets/helmet-preview.png";
import './Header.css';

function Header() {
  return (
    <header className="Header">
      <div className="top-header">
        {/* <img src={helmetLogo} 
          className="header-logo"
          alt="oversteer logo"/> */}
        <a href="/" className="app-title">
          over<b>steer</b>
        </a>
      </div>
      <div className="link-container">
        <a href="/" className="header-link">Home</a>
        <a href="/teams" className="header-link">Teams</a>
        <a href="/drivers" className="header-link">Drivers</a>
      </div>
    </header>
  )
}

export default Header;