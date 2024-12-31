import { useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import "../styles/order-summary.css";
import { Button } from "src/magicUi/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/magicUi/ui/dialog";
import { useCart } from "../context/CartContext";
import { Page } from "../types/types";

interface OrderPageProps {
  setActivePage: (page: Page) => void;
}

export default function OrderSummary({ setActivePage }: OrderPageProps){
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { cartItem } = useCart();

  if (!cartItem) {
    return;
  }

  const total =
    cartItem.service.cost +
    cartItem.addons.reduce(
      (total, item) => total + item.addon.cost * item.quantity,
      0
    );

  return (
    <div className="summary-container">
      <button className="back-button"
      onClick={() => setActivePage("basket")}
      >
        <ArrowLeft className="w-5 h-5" />
        Back TO Basket
      </button>

      <h1 className="summary-container-summary">Summary :-</h1>

      <div className="summary-card">
        <div className="service-section">
          <h2 className="service-section-name">Service :-</h2>
          <div className="service-details">
            <div className="service-image">
              <img
                src={cartItem?.service.image[0]}
                alt={cartItem?.service.name}
              />
            </div>
            <span className="service-name">{cartItem?.service.name}</span>
            <span className="service-price">Rs {cartItem?.service.cost}</span>
          </div>
          {cartItem?.addons.length > 0 && (
            <>
              <h2 className="service-section-name">Addon :-</h2>
              {cartItem?.addons.map((addon) => (
                <div key={addon.addon._id} className="addon-details">
                  <div className="addon-image1">
                    <img src={addon.addon.imageUrl} alt={addon.addon.name} />
                  </div>
                  <div className="addon-info">
                    <span className="addon-name">{addon.addon.name}</span>
                    <span className="addon-quantity">
                      Quantity {addon.quantity}
                    </span>
                  </div>
                  <span className="addon-price2">Rs {addon.addon.cost}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="total-section">
          <span>Total :-</span>
          <span>{total}</span>
        </div>
      </div>

      <div className="details-card">
        <div className="time-slot">
          <span className="Mainlabel">Selected Time Slot :-</span>
          {/* <span>On Fri, Dec 20 at 11:00 AM-12:00 PM</span> */}
          <span>On {cartItem.selectedDate} at {cartItem.selectedTimeSlot}</span>
        </div>

        <div className="service-type">
          <span className="Mainlabel">Service Type :-</span>
          <div className="type-value">
            <span>At Home</span>
            <Home className="w-5 h-5" />
          </div>
        </div>

        <div className="address">
          <span className="Mainlabel">Address :-</span>
          <div className="address-details">
            <p>Tipu Sultan</p>
            <p>Tipuladen Garden Apartment 8th floor room no. -567,</p>
            <p>Nima Nagar near HDFC Bank, Bangalore Urban,</p>
            <p>Karnataka - 560064</p>
          </div>
        </div>
      </div>

      <Button
        className="place-order-button"
        onClick={() => setShowSuccessModal(true)}
      >
        Place Order
      </Button>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Placed Successfully!</DialogTitle>
          </DialogHeader>
          <p>
            Thank you for your order. We will notify you once it's confirmed.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
