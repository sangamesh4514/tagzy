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
    title: "Lorem, ipsum dolor",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat consequuntur consectetur expedita voluptas amet, non voluptate aut minus facilis temporibus iste quibusdam.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 2,
    title: "Lorem, ipsum dolor",
    description:
      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat consequuntur consectetur expedita voluptas amet, non voluptate aut minus facilis temporibus iste quibusdam.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 3,
    title: "Lorem, ipsum dolor",
    description:
      "  { Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat consequuntur consectetur expedita voluptas amet, non voluptate aut minus facilis temporibus iste quibusdam.",
    imageUrl: "/assets/home.jpeg",
  },
  {
    id: 4,
    title: "Lorem, ipsum dolor",
    description:
      "  { Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat consequuntur consectetur expedita voluptas amet, non voluptate aut minus facilis temporibus iste quibusdam.",
    imageUrl: "/assets/home.jpeg",
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
