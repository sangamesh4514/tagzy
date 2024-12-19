import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { DateSelector } from "./DateSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { OrderModal } from "./OrderModal";
import { Page } from "../types/types";
interface CartProps {
  setActivePage: (page: Page) => void;
}

export function Cart({ setActivePage }: CartProps) {
  const {
    cartItem,
    removeFromCart,
    incrementAddon,
    decrementAddon,
    removeAddon,
    setSelectedDate,
    setSelectedTimeSlot,
    addAddon,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!cartItem) {
    return (
      <div className="cart">
        <button onClick={() => setActivePage("services")}>
          🔙back to service pagepage
        </button>

        <h2>My Cart</h2>
        <p>Your cart is pagety</p>
      </div>
    );
  }

  const totalAmount =
    cartItem.service.cost +
    cartItem.addons.reduce(
      (total, item) => total + item.addon.cost * item.quantity,
      0
    );

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
    // Implement order placement logic here
    console.log("===Order placed:", cartItem);
  };

  // const handleOrderSubmit = (mobileNumber: number, otp:number) => {
  const handleOrderSubmit = () => {
    // Implement order placement logic here
    // console.log('Order placed:', { ...cartItem, mobileNumber, otp });
    setIsModalOpen(false);
    // TODO: Implement user login logic here
  };

  const getAddons = () => {
    if (!cartItem.service.addOns) return null; // or an empty array: []

    return cartItem.service.addOns.map((addOn) => (
      <div key={addOn._id}>
        <h3>{addOn.name}</h3>
      </div>
    ));
  };

  return (
    <div className="cart">
      <button onClick={() => setActivePage("services")}>
        🔙back to service pagepage
      </button>
      <h2>Your Cart</h2>
      <div className="cart-item">
        <img
          src={cartItem.service.image[0]}
          alt="imag"
          style={{ height: "20px", width: "20px" }}
        />
        <h3>{cartItem.service.name}</h3>
        <p>₹{cartItem.service.cost}</p>
        {/* <button onClick={removeFromCart} className="remove-button">
          Remove
        </button> */}
      </div>
      {cartItem.addons.length > 0 && (
          <div className="cart-addons">
            <h4>Addons:</h4>
            {cartItem.addons.map(({ addon, quantity }) => (
              <div key={addon._id} className="cart-addon">
                <h5>{addon.name}</h5>
                <p>
                  ₹{addon.cost} x {quantity}
                </p>
                <div className="addon-actions">
                  <button onClick={() => decrementAddon(addon._id)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => incrementAddon(addon._id)}>+</button>
                  <button
                    onClick={() => removeAddon(addon._id)}
                    className="remove-addon"
                    style={{ width: "75px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      {getAddons()}
      <DateSelector
        service={cartItem.service}
        selectedDate={cartItem.selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TimeSlotSelector
        service={cartItem.service}
        selectedTimeSlot={cartItem.selectedTimeSlot}
        onSelectTimeSlot={setSelectedTimeSlot}
      />
      <div className="cart-total">
        <h4>Total: ₹{totalAmount}</h4>
      </div>
      <button
        className="place-order-button"
        disabled={!cartItem.selectedDate || !cartItem.selectedTimeSlot}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
    // <ServiceBooking/>
  );
}
