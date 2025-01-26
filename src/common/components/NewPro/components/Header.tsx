import React from "react";
import "../styles/Header.css";
import { Page } from "../types/types";
import {  MapPin } from "lucide-react";
import CountUp from "react-countup";
import VerifiedMark from "src/assets/icons/VerifiedMark";

export interface Profile {
  profilePicture?: string;
  name?: string;
  skillTitle?: string;
  location?: string;
  accountCreated?: string;
  experience?: number;
  categoryType?: string;
}

interface HeaderProps {
  userProfile: Profile;
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export function Header({
  activePage,
  setActivePage,
  userProfile,
}: HeaderProps) {
  const {
    name,
    skillTitle,
    profilePicture,
    accountCreated,
    location,
    // categoryType,
    experience,
  } = userProfile;
  const subscribers = 3487;

  return (
    <header className="pro-header">
      <div className="cover-image">
        <img src="/assets/cover.jpg" alt="Cover" />
      </div>
      <div className="profile-section">
        <div className="profile-avatar">
          <img id="circle-profile-image" src={profilePicture} alt={name} />
        </div>
        <div className="profile-info">
          <div className="details-container">
            <h1 className="pro-name">
              {name} <VerifiedMark width={28} />
            </h1>
            <p className="profile-title">{skillTitle}</p>
            <p className="profile-location">
              <MapPin className="h-4 w-4" />
              {location}
            </p>
          </div>
          <div className="stats-container" id="counterContainer">
            <div className="stat">
              <div className="icon-section">
                <span className="icon">👥</span>
              </div>
              <div className="content-section">
                <CountUp className="value" end={subscribers} duration={2} />
                <div className="content-section-label">Service Booked</div>
              </div>
            </div>
            <div className="separator"></div>

            <div className="stat">
              <div className="icon-section">
                <span className="icon">💼</span>
              </div>
              <div className="content-section">
                <CountUp className="value" end={experience || 1} duration={2} />
                <div className="content-section-label">Experience</div>
              </div>
            </div>
            <div className="separator"></div>

            <div className="stat">
              <div className="icon-section">
                <span className="icon">
                🗓️  
                {/* <Calendar className="h-4 w-4" /> */}
                </span>
              </div>
              <div className="content-section">
                <span className="account-creation">{accountCreated}</span>
                <div className="content-section-label">Member Since</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navigation">
        {/* {activePage === "login" ? (
          <span className="nav-button active">Login</span>
        ) : activePage === "checkout" ? (
          <span className="nav-button active">Checkout</span>
        ) : ( */}
          <>
            <button
              className={`nav-button ${
                activePage === "services" ? "active" : ""
              }`}
              onClick={() => setActivePage("services")}
            >
              Services
            </button>
            <button
              className={`nav-button ${activePage === "about" ? "active" : ""}`}
              onClick={() => setActivePage("about")}
            >
              About
            </button>
            <button
              className={`nav-button ${activePage === "basket" ? "active" : ""}`}
              onClick={() => setActivePage("basket")}
            >
              Basket
            </button>
            {/* <button
              className={`nav-button ${activePage === "login" ? "active" : ""}`}
              onClick={() => setActivePage("login")}
            >
              login
            </button> */}
            {/* <button
              className={`nav-button ${activePage === "checkout" ? "active" : ""}`}
              onClick={() => setActivePage("checkout")}
            >
              checkout
            </button> */}
          </>
        {/* )} */}
      </nav>
    </header>
  );
}
