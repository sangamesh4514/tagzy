import React from "react";
import "../styles/Header.css";
import { Page } from "../types/types";
import { MapPin } from "lucide-react";
import BannerCarousel from "src/common/routes/Banner/BannerCarousel";
import CountUp from "react-countup";

export interface Profile {
  profilePicture?: string; //
  name?: string; //
  skillTitle?: string; //
  isUserVerified?: boolean; //
  location?: string; //
  email?: string; //
  accountCreated?: string; //
  experience?: number;
  languages?: string[]; //
  categoryType?: string; //
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
    isUserVerified,
    profilePicture,
    email,
    accountCreated,
    languages,
    location,
    categoryType,
    experience
  } = userProfile;
  const subscribers = 3487;
  const likes = 1593;

  console.log('===accountCreated',accountCreated);

  return (
    <header className="header">
      <div className="cover-image">
        <img src="/assets/cover.jpg" alt="Cover" />
        {/* <BannerCarousel /> */}
      </div>
      <div className="profile-section">
        <div className="profile-avatar">
          <img src={profilePicture} alt={name} />
        </div>
        <div className="profile-info">
          <div className="details-container">
            <h1>{name}</h1>
            <p className="profile-title">{skillTitle}</p>
            <p
              className="profile-location"
              style={{ display: "flex", alignItems: "center" }}
            >
              <MapPin className="h-4 w-4" />
              {location}
            </p>
          </div>
          <div className="stats-container">
            {/* Subscribers */}
            <div className="stat">
              <div className="icon-section">
                <span className="icon">👥</span>
              </div>
              <div className="content-section">
                <CountUp className="value" end={subscribers} duration={2} />
                <div className="label">Service Booked</div>
              </div>
            </div>
            <div className="separator"></div>

            {/* Posts */}
            <div className="stat">
              <div className="icon-section">
                <span className="icon">💼</span>
              </div>
              {/* <div className="separator"></div> */}
              <div className="content-section">
                <CountUp className="value" end={experience || 1} duration={2} />
                <div className="label">Experience</div>
              </div>
            </div>
            <div className="separator"></div>

            {/* Likes */}
            <div className="stat">
              <div className="icon-section">
                <span className="icon">❤️</span>
              </div>
              {/* <div className="separator"></div> */}
              <div className="content-section">
              {accountCreated}
                {/* <CountUp className="value" end={(accountCreated && +accountCreated) || 1} duration={2} /> */}
                <div className="label">Member Since</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navigation">
        <button
          className={`nav-button ${activePage === "services" ? "active" : ""}`}
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
      </nav>
    </header>
  );
}
