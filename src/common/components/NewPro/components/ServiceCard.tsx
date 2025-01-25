import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ImageCarousel } from "./ImageCarousel";
import "../styles/ServiceCard.css";
import { IAddon, Service } from "src/common/types";
import { Modal } from "./Modal";
import { Badge } from "src/magicUi/ui/badge";
import Rating from "./rating-display";
import { Building, House } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const {
    _id,
    name,
    description,
    cost,
    image,
    addOns,
    isServiceVerified,
    typeOfService,
  } = service;
  const { cartItem, addToCart, addAddon, removeAddon } = useCart();
  const [showModal, setShowModal] = useState(false);

  const isServiceInCart = cartItem?.service._id === _id;
  const addonsInCart = cartItem?.addons || [];

  const handleBook = () => {
    console.log('===onclick handle');
    if (!isServiceInCart) {
      if (!cartItem) {
        addToCart(service);
      } else {
        setShowModal(true);
      }
    }
  };

  const handleAddonToggle = (addon: IAddon) => {
    if (isServiceInCart) {
      const addonInCart = addonsInCart.find(
        (item) => item.addon._id === addon._id
      );
      if (addonInCart) {
        removeAddon(addon._id);
      } else {
        addAddon(addon);
      }
    }
  };

  const handleModalConfirm = () => {
    addToCart(service);
    setShowModal(false);
  };

  return (
    <>
      <div className="service-card">
        <ImageCarousel images={image} />
        <div className="service-content">
          <h3 className="serviceName">
            {name}
            {isServiceVerified && (
              <Badge variant="outline" className="border-colorA text-colorA">
                Verified
              </Badge>
            )}
          </h3>
          <p className="serviceDescription">{description}</p>
          <div className="service-footer">
            <span className="price">₹{cost}</span>
            <button
              onClick={handleBook}
              className="book-button"
              disabled={isServiceInCart}
            >
              {isServiceInCart ? "In Cart" : "Book Now"}
            </button>
          </div>
          <div className="serviceType">
            <div className="serviceLocation">Service Location :-</div>
            {typeOfService === "AT_HOME" ? (
              <span className="servicePlace text-colorA">
                At User Place <House color="#096c6c" />
              </span>
            ) : (
              <span className="servicePlace text-colorA">
                At Provider Place <Building color="#096c6c" />
              </span>
            )}
          </div>

          <Rating
            rating={service.rating}
            ratingCount={service.ratingCount}
            size="lg"
          />
        </div>
        {addOns.length > 0 && (
          <div className="addonsSection">
            <p className="addon-disclaimer">
              Addons can only be purchased with the service.
            </p>
            {addOns.map((addon) => (
              <div key={addon._id} className="addon-item">
                <div className="firstBlock">
                  <h4 className="addonName">{addon.name}</h4>
                </div>
                <div className="secondBlock">
                  <img
                    src={addon.imageUrl}
                    alt={addon.imageUrl}
                    className="addon-image"
                  />
                  <div className="thirdBlock">
                    <button
                      onClick={() => handleAddonToggle(addon)}
                      className="addon-button"
                      disabled={!isServiceInCart}
                    >
                      {addonsInCart.some((item) => item.addon._id === addon._id)
                        ? "Remove"
                        : "Add"}
                    </button>
                    <span className="addon-price">₹{addon.cost}</span>
                  </div>
                </div>
                {/* <div className="fourthBlock"> */}
                <div className="addon-info">
                    <p className="addonDescription">{addon.description}</p>
                  </div>
                {/* </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleModalConfirm}
        message="Your previous service will be removed from the cart. Do you want to continue?"
      />
    </>
  );
}
