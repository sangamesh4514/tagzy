import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import "../styles/service-booking.css";
import { Button } from "../../ui/button";
import { useCart } from "../context/CartContext";
import { IAddon } from "src/common/types";
import { Page } from "../types/types";
import { Dialog, DialogTrigger } from "src/magicUi/ui/dialog";
import { renderDialogContent } from "../../profile/userProfile";
import EmptyCart from "src/assets/icons/EmptyCart";
import { WorkingDaysCalendar } from "./WorkingDaysCalendar";
import GoogleLocation from "./LocationFetcher";
import { useLoadScript } from "@react-google-maps/api";

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
    addAddon,
  } = useCart();
  const addonsInCart = cartItem?.addons || [];

  // Load the Google Maps script and Places library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY || "",
    libraries: ["places"], // Load the Places library
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (!cartItem) {
    return (
      <div className="cart">
        <h1 className="cart-header">
          Cart <ShoppingCart />
        </h1>
        <h2 style={{ fontSize: "20px" }}>Your Cart is Empty</h2>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setActivePage("login");
  };

  const handleAddonToggle = (addon: IAddon) => {
    addAddon(addon);
  };

  const getTotal = () => {
    return (
      cartItem.service.cost +
      cartItem.addons.reduce(
        (total, { addon, quantity }) => total + addon.cost * quantity,
        0
      )
    );
  };

  const total = getTotal();

  return (
    <div className="service-booking">
      <main>
        <section className="service-section">
          <button className="empty-cart-button" onClick={removeFromCart}>
            Clear Cart <EmptyCart className="w-6 h-6" />
          </button>

          {/* Service Information */}
          <div className="service-info">
            <h2 className="service-title">Service :-</h2>
            <div className="service-card-cart">
              <div className="service-image">
                <img
                  src={cartItem.service.image[0]}
                  alt="service-image"
                  width={100}
                  height={100}
                />
              </div>
              <h3 style={{ fontSize: "1rem" }}>{cartItem.service.name}</h3>
              <span className="price">₹{cartItem.service.cost}</span>
            </div>
          </div>

          {/* Addons Section */}
          {addonsInCart.length > 0 && (
            <section className="addons-section">
              <h2 style={{ margin: "1rem 0", fontSize: "1.5rem" }}>
                Addons :-
              </h2>
              {cartItem.addons.map(({ addon, quantity }) => (
                <div key={addon._id} className="addon-card">
                  <img
                    src={addon.imageUrl}
                    alt={addon.name}
                    width={80}
                    height={80}
                  />
                  <div className="addon-info">
                    <h4 style={{ fontSize: "1rem" }}>{addon.name}</h4>
                    <p style={{ fontSize: "1rem", marginBottom: "0" }}>
                      ₹{addon.cost} x {quantity}
                    </p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => decrementAddon(addon._id)}
                      className="decrementAddon"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => incrementAddon(addon._id)}
                      className="incrementAddon"
                    >
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

          {/* Total Price */}
          <div className="total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          {/* Related Addons */}
          {cartItem.addons.length !== cartItem.service.addOns.length && (
            <section className="related-addons">
              <h2 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>
                Add Addons Related to this Service :-
              </h2>
              <div className="related-addons-grid">
                {cartItem.service.addOns.map(
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
                          <h4 style={{ fontSize: "1rem" }}>{addon.name}</h4>
                          <p style={{ fontSize: "1rem", marginBottom: "0" }}>
                            ₹{addon.cost}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleAddonToggle(addon)}
                          disabled={
                            !!addonsInCart.find(
                              (item) => item.addon._id === addon._id
                            )
                          }
                          className="addon-button"
                        >
                          Add
                        </Button>
                      </div>
                    )
                )}
              </div>
            </section>
          )}

          {/* User Time & Address */}
          <div className="timeAndAddress">
            <div className="userSelectTime">
              <h2>Select a Date & Time :-</h2>
              <WorkingDaysCalendar
                workingDays={cartItem.service.workingDays}
                timeSlots={cartItem.service.timeSlots}
              />
            </div>
            <div className="useraddress">
              <h3>Address</h3>
              <GoogleLocation />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="cart-footer">
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
            <Button
              className="proceed-button text-white hover:bg-gray-800"
              onClick={handlePlaceOrder}
            >
              Proceed with phone number
            </Button>
          )}
        </div>
      </footer> */}
    </div>
  );
}
