import "./style.css";
import ContactDialog from "../ContactDialog";
import { useEffect, useState } from "react";
import ProfilePopup from "./ProfilePopup";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    const userSessionData = sessionStorage.getItem("userInfo");
    return userSessionData ? JSON.parse(userSessionData) : null;
  });

  // Check session storage changes when component re-renders
  useEffect(() => {
    const checkUserSession = () => {
      const userSessionData = sessionStorage.getItem("userInfo");
      setUserLoggedIn(userSessionData ? JSON.parse(userSessionData) : null);
    };

    // Run check initially and whenever the page re-renders
    checkUserSession();

    // Optionally, poll for changes (as sessionStorage doesn't trigger 'storage' in the same tab)
    const interval = setInterval(checkUserSession, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navWrapper">
      <div className="logoAndText">
        <a href="/">
          <img className="logo" src="/logo.png" alt="logo" />
        </a>
      </div>
      {userLoggedIn ? (
        <div className="navbarItem">
          <ProfilePopup user={userLoggedIn}/>
        </div>
      ) : (
        <div className="contact-form">
          <ContactDialog headerView={true} />
        </div>
      )}
    </div>
  );
};

export default Header;
