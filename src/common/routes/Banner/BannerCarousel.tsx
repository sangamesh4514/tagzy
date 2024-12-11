import React, { useEffect, useState } from "react";
import "./BannerCarousel.css";

const banners = [
  {
    id: 1,
    title: "Register Your Business",
    description: "Join our platform and reach more customers",
    highlight: "0% Commission",
  },
  {
    id: 2,
    title: "Grow Your Business",
    description: "Access powerful tools and analytics",
    highlight: "Free to Join",
  },
  {
    id: 3,
    title: "Manage Bookings",
    description: "Easy scheduling and client management",
    highlight: "Smart Features",
  },
];

const BannerCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="banner-carousel">
      {banners.map((banner, index) => {
        let className = "banner";
        if (index === activeIndex) {
          className += " active";
        } else if (index === prevIndex) {
          className += " prev";
        }

        return (
          <div key={banner.id} className={className}>
            <h1>{banner.title}</h1>
            <p>{banner.description}</p>
            <span className="highlight">{banner.highlight}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BannerCarousel;
