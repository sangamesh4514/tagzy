import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import "./service-booking.css";
import { Button } from "../../ui/button";
import { useCart } from "../context/CartContext";
import { IAddon } from "src/common/types";
import { Page } from "../types/types";
import { DateSelector } from "./DateSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { Dialog, DialogTrigger } from "src/magicUi/ui/dialog";
import { renderDialogContent } from "../../profile/userProfile";
import EmptyCart from "src/assets/icons/EmptyCart";
import StickyBar from "./StickyBar";

interface ServiceBookingProps {
  setActivePage: (page: Page) => void;
}

export default function ServiceBooking({ setActivePage }: ServiceBookingProps) {
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
  const addonsInCart = cartItem?.addons || [];

  if (!cartItem) {
    return (
      <div className="cart">
        <button
          className="back-button"
          onClick={() => setActivePage("services")}
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>

        <h2>Your Cart</h2>
        <p>Your Cart is Empty</p>
      </div>
    );
  }
  const handlePlaceOrder = () => {
    setActivePage("login");
  };

  const handleAddonToggle = (addon: IAddon) => {
    addAddon(addon);
  };

  const total =
    cartItem.service.cost +
    cartItem.addons.reduce(
      (total, item) => total + item.addon.cost * item.quantity,
      0
    );
  return (
    <div className="service-booking">
      <header className="service-booking-header">
        <button
          className="back-button"
          onClick={() => setActivePage("services")}
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>
        <button className="empty-cart-button" onClick={removeFromCart}>
          Empty Cart
          <EmptyCart className="w-6 h-6" />
        </button>
      </header>

      <main style={{ marginTop: "0.5rem" }}>
        <section className="service-section">
          <h2 className="service-section-h2">Service :-</h2>
          <div className="service-card-cart">
            <div className="service-image">
              <img
                src={cartItem.service.image[0]}
                alt="service-image"
                width={100}
                height={100}
              />
            </div>
            <h3>{cartItem.service.name}</h3>
            <span className="price">₹{cartItem.service.cost}</span>
          </div>
        </section>
        {cartItem.addons.length > 0 && (
          <section className="addons-section">
            <h2>Addons :-</h2>
            {cartItem.addons.map(({ addon, quantity }) => (
              <div key={addon._id} className="addon-card">
                <img
                  src={addon.imageUrl}
                  alt={addon.name}
                  width={80}
                  height={80}
                />
                <div className="addon-info">
                  <h4>{addon.name}</h4>
                  <p>
                    ₹{addon.cost} x {quantity}
                  </p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decrementAddon(addon._id)}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => incrementAddon(addon._id)}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  className="delete-button"
                  onClick={() => removeAddon(addon._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="price">₹{addon.cost * quantity}</span>
              </div>
            ))}
          </section>
        )}
        <div className="total">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
        {!(cartItem.addons.length === cartItem.service.addOns.length) && (<section className="related-addons">
          <h2>Add Addons Related to this Service :-</h2>
          <div className="related-addons-grid">

            {cartItem && cartItem.service.addOns.map(
              (addon) =>
                !addonsInCart.find(
                  (item) => item.addon._id === addon._id
                ) && (
                  <div key={addon._id} className="related-addon-card">
                    <img
                      src={addon.imageUrl}
                      alt={addon.name}
                      width={80}
                      height={80}
                    />
                    <div className="addon-info">
                      <h4>{addon.name}</h4>
                      <p>₹{addon.cost}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleAddonToggle(addon)}
                      disabled={
                        !!addonsInCart.find(
                          (item) => item.addon._id === addon._id
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                )
            )}
          </div>
        </section>)}
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
      </main>

      <footer className="cart-footer">
        <div className="footer-content">
          <h3>Almost There</h3>
          <p>Login or Signup to place your order</p>
          {!cartItem.selectedDate || !cartItem.selectedTimeSlot ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="proceed-button text-white hover:bg-gray-800">
                  Proceed with phone number
                </Button>
              </DialogTrigger>
              {renderDialogContent()}
            </Dialog>
          ) : (
            // <StickyBar setActivePage={setActivePage} test={"counterContainer"} />
            <Button
              className=" proceed-button text-white hover:bg-gray-800"
              onClick={handlePlaceOrder}
            >
              Proceed with phone number
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
