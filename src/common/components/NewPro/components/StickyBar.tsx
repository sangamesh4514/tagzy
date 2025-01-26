/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../styles/StickyBar.css";
import { useCart } from "../context/CartContext";
// import { Page } from "../types/types";

interface StickyBarProps {
  // setActivePage: (page: Page) => void;
  elementId: string;
  toggleSidebar: () => void;
  buttonName: String;
}

const StickyBar: React.FC<StickyBarProps> = ({ elementId, toggleSidebar, buttonName }) => {
  
  const [isInView, setIsInView] = useState(false); 
  const { cartItem } = useCart();

  useEffect(() => {
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      console.warn("==No element with id 'circle-profile-image' found.");
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsInView(true); 
      } else {
        setIsInView(false); 
      }
    };

    const observerOptions = {
      threshold: 0.1, 
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, []);


  if (!cartItem) {
    return;
  }

  const totalAmount =
    cartItem.service.cost +
    cartItem.addons.reduce(
      (total, item) => total + item.addon.cost * item.quantity,
      0
    );

  return (
    <div className={`sticky-bar ${!isInView ? "visible" : "hidden"}`}>
      <div className="sticky-bar-content">
        <div className="sticky-bar-image">
          <img
            src={cartItem.service.image[0] || "https://via.placeholder.com/50"}
            alt="Service-Image"
          />
        </div>

        <div className="sticky-bar-info">
          <p className="item-title">
            {" "}
            {cartItem.service.name} {cartItem.addons.length ? "+ Addons" : ""}
          </p>
          <p className="item-price">Total: ₹{totalAmount}</p>
        </div>

        <div className="mt-2.5">
          <button className="cart-button" onClick={() => toggleSidebar()}>
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyBar;
