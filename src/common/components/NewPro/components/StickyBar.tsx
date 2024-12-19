import React, { useEffect, useState, useRef } from "react";
import "../styles/StickyBar.css";
import { Cart } from "./Cart";
import { useCart } from "../context/CartContext";
import { Page } from "../types/types";

interface StickyBarProps {
  setActivePage: (page: Page) => void;
}

const StickyBar: React.FC<StickyBarProps> = ({ setActivePage }) => {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { cartItem } = useCart();

  useEffect(() => {
    const targetElement = document.querySelector(".service-content");

    if (!targetElement) {
      console.warn("No element with class 'service-content' found.");
      return;
    }

    // Intersection Observer to detect visibility of the target element
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Update visibility based on intersection
        setIsStickyVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    // Start observing the target element
    observer.observe(targetElement);
    observerRef.current = observer;

    // Cleanup observer on unmount
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
    <div className={`sticky-bar ${isStickyVisible ? "visible" : "hidden"}`}>
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

        <button className="go-to-cart" onClick={() => setActivePage("cart")}>
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default StickyBar;
