import React, { useState } from "react";
import { Header } from "./components/Header";
import { ServiceCard } from "./components/ServiceCard";
import { CartProvider } from "./context/CartContext";
import { Page } from "./types/types";
import "./styles/style.css";
import { IUserProfile } from "src/common/types";
import { CategoryCodeToName, languageCodeToName } from "src/common/constant";
import StickyBar from "./components/StickyBar";
import ServiceBooking from "./components/service-booking";
import LoginPage from "./components/Login";
// import OrderSummary from "./components/order-summary";
import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import { cn } from "src/lib/utils";
import { Badge } from "src/magicUi/ui/badge";
import { Mail, Phone } from "lucide-react";
import { getAverageRating } from "src/common/utils";
import Rating from "./components/rating-display";

interface IProps {
  userProfile: IUserProfile;
}

export default function NewPro({ userProfile }: IProps) {
  const [activePage, setActivePage] = useState<Page>("services");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
    phoneNumber,
    address,
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
  const tempEmail = "abcdefgh@tagzy.in";
  const maskedPhoneNumber = phoneNumber.replace(/.(?=.{5})/g, "*");

  const maskedEmail = (email || tempEmail).replace(/^[^@]+/, (localPart) =>
    "*".repeat(localPart.length)
  );

  const rate = getAverageRating(services);

  return (
    <CartProvider>
      <div className="pro-page">
        <AnimatedGridPattern
          numSquares={25} // Number of squares in the pattern
          maxOpacity={0.2} // Maximum opacity of the pattern
          duration={3}
          repeatDelay={0.5}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,white)] "
          )}
          width={80}
          height={80}
          strokeDasharray={1}
        />
        <Header
          userProfile={userData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div
          className={`main-content ${
            activePage === "basket" ? "main-content-cart" : ""
          }`}
        >
          <div className={`content-area ${isOpen ? "addOverflow" : ""}`}>
            {activePage === "services" &&
              (services?.length ? (
                <>
                  <div className="services-grid">
                    {services &&
                      services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                      ))}
                  </div>
                  <StickyBar
                    setActivePage={setActivePage}
                    toggleSidebar={toggleSidebar}
                    test={"circle-profile-image"}
                  />

                  <div className={`sidebar ${isOpen ? "open" : "notOpen"}`}>
                    <button onClick={toggleSidebar} className="close-btn">
                      &times;
                    </button>
                    <LoginPage setActivePage={setActivePage} />
                  </div>
                </>
              ) : (
                <div className="about-section" style={{ height: "500px" }}>
                  <h1>Currently, the provider has no services available.</h1>
                </div>
              ))}
            {activePage === "about" && (
              <div className="about-section">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    About Provider:-
                  </h3>
                  <p className="text-black">{description}</p>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <Phone className="h-4 w-4" />
                  <span className="text-lg font-semibold">
                    Mobile Number:-{" "}
                  </span>
                  <span style={{ fontSize: "1rem" }}>{maskedPhoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 my-5 text-black">
                  <Mail className="h-4 w-4" />
                  <span className="text-lg font-semibold">Email:- </span>
                  <span style={{ fontSize: "1rem" }}>{maskedEmail}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Experience:-
                  </h3>
                  <p className="text-black">
                    {experience} years of professional experience
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Address:-
                  </h3>
                  <p className="text-black">{address}</p>
                </div>
                <div className="my-5">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Languages:-
                  </h3>
                  <div className="flex gap-2">
                    {languages?.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-black text-black"
                      >
                        {languageCodeToName[+language - 1]}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    Overall Ratings:-
                  </h3>
                  <div className="aboutRating flex gap-2">
                    {
                      <Rating
                        rating={rate.sumRating}
                        ratingCount={rate.sumRatingCount}
                        size="lg"
                      />
                    }
                  </div>
                </div>
              </div>
            )}
            {activePage === "basket" && (
              <ServiceBooking setActivePage={setActivePage} />
            )}
            {/* {activePage === "login" && (
              <LoginPage setActivePage={setActivePage} />
            )} */}
            {/* {activePage === "checkout" && (
              <OrderSummary setActivePage={setActivePage} />
            )} */}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
