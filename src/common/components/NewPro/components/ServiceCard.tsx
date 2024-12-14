import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ImageCarousel } from './ImageCarousel';
import '../styles/ServiceCard.css';
import { IAddon, Service } from 'src/common/types';
import { Modal } from './Modal';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) { 
  const {_id, name, description, cost, image, addOns } = service;
  const { cartItem, addToCart, addAddon, removeAddon } = useCart();
  const [showModal, setShowModal] = useState(false);

  const isServiceInCart = cartItem?.service._id === _id;
  const addonsInCart = cartItem?.addons || [];

  const handleBook = () => {
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
      const addonInCart = addonsInCart.find(item => item.addon._id === addon._id);
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
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="service-footer">
          <span className="price">₹{cost}</span>
          <button
            onClick={handleBook}
            className="book-button"
            disabled={isServiceInCart}
          >
            {isServiceInCart ? 'In Cart' : 'Book Now'}
          </button>
        </div>
      </div>
      {addOns.length > 0 && (
        <div className="addons-section">
          <p className="addon-disclaimer">Addons can only be purchased with the service.</p>
          {addOns.map(addon => (
            <div key={addon._id} className="addon-item">
              <img src={addon.imageUrl} alt={addon.imageUrl} className="addon-image" />
              <div className="addon-info">
                <h4>{addon.name}</h4>
                <p>{addon.description}</p>
                <span className="addon-price">₹{addon.cost}</span>
              </div>
              <button
                onClick={() => handleAddonToggle(addon)}
                className="addon-button"
                disabled={!isServiceInCart}
              >
                {addonsInCart.some(item => item.addon._id === addon._id) ? 'Remove' : 'Add'}
              </button>
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

