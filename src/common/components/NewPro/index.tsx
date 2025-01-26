import { useState } from "react";
import { Header } from "./components/Header";
import { ServiceCard } from "./components/ServiceCard";
import { CartProvider } from "./context/CartContext";
import { Page } from "./types/types";
import "./styles/style.css";
import { IUserProfile } from "src/common/types";
import { CategoryCodeToName } from "src/common/constant";
import StickyBar from "./components/StickyBar";
import ServiceBooking from "./components/service-booking";
import AnimatedGridPattern from "src/magicUi/ui/animated-grid-pattern";
import { cn } from "src/lib/utils";
import { AboutSection } from "./components/AboutSection";

interface IProps {
  userProfile: IUserProfile;
}

export default function NewPro({ userProfile }: IProps) {
  const [activePage, setActivePage] = useState<Page>("services");
  // const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setActivePage('basket')
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

  return (
    <CartProvider>
      <div className="pro-page">
        {/* <span id="circle-profile-image-head"></span> */}
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
          <div className={`content-area`}>
          {/* ${isOpen ? "addOverflow" : ""} */}
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
                    // setActivePage={setActivePage}
                    toggleSidebar={toggleSidebar}
                    elementId={"circle-profile-image"}
                    buttonName={"Go to Cart"}
                  />
                </>
              ) : (
                <div className="about-section" style={{ height: "500px" }}>
                  <h1>Currently, the provider has no services available.</h1>
                </div>
              ))}
            {activePage === "about" && (
              <AboutSection
                description={description}
                maskedPhoneNumber={maskedPhoneNumber}
                maskedEmail={maskedEmail}
                experience={experience}
                address={address}
                services={services}
                languages={languages}
              />
            )}
            {activePage === "basket" && (
              <ServiceBooking setActivePage={setActivePage} />
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
