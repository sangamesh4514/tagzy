import React, { useState } from "react";
import { Header } from "./components/Header";
import { ServiceCard } from "./components/ServiceCard";
import { CartProvider } from "./context/CartContext";
import { Page } from "./types/types";
import "./styles/App.css";
import { IUserProfile } from "src/common/types";
import { CategoryCodeToName } from "src/common/constant";
import StickyBar from "./components/StickyBar";
import { Cart } from "./components/Cart";
import ServiceBooking from "./components/service-booking";

interface IProps {
  userProfile: IUserProfile;
}

export default function NewPro({ userProfile }: IProps) {
  const [activePage, setActivePage] = useState<Page>("services");

  const {
    name,
    skillTitle,
    isUserVerified,
    profilePicture,
    email,
    createdAt,
    languages,
    location,
    categoryId,
    experience,
    description,
    services,
  } = userProfile;

  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${monthNames[month]} ${year}`;

  const userData = {
    name: name,
    skillTitle: skillTitle,
    isUserVerified: isUserVerified,
    profilePicture: profilePicture,
    email: email,
    accountCreated: formattedDate,
    languages: languages,
    location: location?.name,
    categoryType: CategoryCodeToName[categoryId - 1],
    experience: experience,
  };

  return (
    <CartProvider>
      <div className="app">
        <Header
          userProfile={userData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div className="main-content">
          <div className="content-area">
            {activePage === "services" && (
              <>
                <div className="services-grid">
                  {services &&
                    services.map((service) => (
                      <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
                <StickyBar setActivePage={setActivePage} />
              </>
            )}
            {activePage === "about" && (
              <div className="about-section">
                <h2>About Us</h2>
                <p>{description}</p>
              </div>
            )}
            {activePage === "cart" && <Cart setActivePage={setActivePage}/>}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
