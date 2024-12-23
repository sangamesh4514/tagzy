import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { DateSelector } from "./DateSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { OrderModal } from "./OrderModal";

export function Cart() {
  const {
    cartItem,
    removeFromCart,
    incrementAddon,
    decrementAddon,
    removeAddon,
    setSelectedDate,
    setSelectedTimeSlot,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!cartItem) {
    return (
      <div className="cart">
        <h2>My Cart</h2>
        <p>Your cart is empty</p>
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
    console.log("Order placed:", cartItem);
  };

  // const handleOrderSubmit = (mobileNumber: number, otp:number) => {
    const handleOrderSubmit = () => {
    // Implement order placement logic here
    // console.log('Order placed:', { ...cartItem, mobileNumber, otp });
    setIsModalOpen(false);
    // TODO: Implement user login logic here
  };

  return (
    <div className="cart">
      <h2>My Cart</h2>
      <div className="cart-item">
        <h3>{cartItem.service.name}</h3>
        <p>₹{cartItem.service.cost}</p>
        <button onClick={removeFromCart} className="remove-button">
          Remove
        </button>
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
  );
}
