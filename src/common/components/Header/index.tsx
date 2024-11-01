import React from "react";
import "./style.css";
import ContactDialog from "../ContactDialog";

const Header = () => {
  return (
    <div className="navWrapper">
      <div className="logoAndText">
        <img className="logo" src="/logo.png" alt="logo" />
        {/* <span className="name text-[3.5rem] font-semibold">TagZy</span> */}
      </div>
      <div className="navbarItem">
        <ContactDialog headerView={true} />
        {/* <a href="/">About</a> */}
        {/* <a href="/">Contact Us</a> */}
      </div>
    </div>
  );
};

export default Header;
