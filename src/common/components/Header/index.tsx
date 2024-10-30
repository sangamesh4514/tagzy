
import React from 'react';
import './style.css';

const Header = () => {

  return (
    <div className="navWrapper">
      <div className="logoAndText">
        <img className="logo" src="/logo1.png" alt="logo" />
        <span className="name text-[3.5rem] font-semibold">TagZy</span>
      </div>
      <div className="navbarItem">
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
    </div>
  );
};

export default Header;

