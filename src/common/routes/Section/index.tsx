import React, { useEffect, useRef, useState } from "react";
import "./ScrollSections.css";
import Iphone15Pro from "src/magicUi/ui/iphone-15-pro";

interface Section {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const sections: Section[] = [
  {
    id: 1,
    title: "Advertise with Us and Build Your Brand",
    description:
      "Boost your visibility on Tagzy, reach more customers, and grow your brand. Turn one-time clients into loyal regulars with top-notch service.",
    imageUrl: "/assets/homepageApp.jpeg",
},
  {
    id: 2,
    title: "Create Business Account and Get Verified",
    description:
      "Register your business on Tagzy and complete the verification process to build trust and credibility with potential customers.",
    imageUrl: "/assets/businessAccount/accountVerification.png",
  },
  {
    id: 3,
    title: "Create Services and Get Them Verified",
    description:
      "Add the services you offer to your profile, and have them verified by Tagzy to ensure quality and reliability for customers.",
    imageUrl: "/assets/businessAccount/services.jpeg",
  },
  {
    id: 4,
    title: "Share QR Code to Get Bookings",
    description:
      "Share your unique QR code to receive bookings seamlessly. Track your bookings effortlessly, all with zero commission fees.",
    imageUrl: "/assets/businessAccount/businessHomepage.png",
  },
  
];

const ScrollSections: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(index + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-sections">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`section ${activeSection === section.id ? "active" : ""}`}
        >
          <div
            className={`content ${
              index % 2 === 0 ? "left-image" : "right-image"
            }`}
          >
            <div className="phone-container">
              <Iphone15Pro
                className="phone-image size-auto"
                src={section.imageUrl}
              />
              {/* <img src={section.imageUrl} alt={section.title} className="phone-image" /> */}
            </div>
            <div
              className={`description ${
                activeSection === section.id ? "visible" : ""
              } ${index % 2 === 0 ? "slide-left" : "slide-right"}`}
            >
              <h2 className="section_title">{section.title}</h2>
              <p className="section_description">{section.description}</p>
              <button className="cta-button">Learn More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollSections;
