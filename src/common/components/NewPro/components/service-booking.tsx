import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import "../styles/service-booking.css";
import { Button } from "../../ui/button";
import { useCart } from "../context/CartContext";
import { IAddon } from "src/common/types";
import { Page } from "../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/magicUi/ui/dialog";
import { renderDialogContent } from "../../profile/userProfile";
import EmptyCart from "src/assets/icons/EmptyCart";
import { WorkingDaysCalendar } from "./WorkingDaysCalendar";
import GoogleLocation from "./LocationFetcher";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/store/store";
import { updateBoolean } from "../dataSlice";
import StickyBar from "./StickyBar";
import { useState } from "react";
import LoginPage from "./Login";
import { clearLocation, getUserInfo } from "src/common/utils/sessionUtlis";

interface ServiceBookingProps {
  setActivePage: (page: Page) => void;
}

export default function ServiceBooking({ setActivePage }: ServiceBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaceText, setOrderPlaceText] = useState("Login User");
  const dispatch = useDispatch();
  const { isBoolean, text } = useSelector((state: RootState) => state.data);
  const {
    cartItem,
    removeFromCart,
    incrementAddon,
    decrementAddon,
    removeAddon,
    addAddon,
  } = useCart();
  const addonsInCart = cartItem?.addons || [];
  const userInfo = getUserInfo();

  const showLoginDialog = () => {
    if (userInfo) {
      setOrderPlaceText("Place Order");
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="bg-white" style={{ height: "250px" }}>
          <DialogHeader>
            <DialogDescription>your order placed</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>;
    } else {
      return (
        <>
          {!(cartItem?.selectedDate || cartItem?.selectedTimeSlot) ? (
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <DialogContent className="bg-white" style={{ height: "250px" }}>
                <DialogHeader>
                  <DialogDescription>
                    Please select Date and Time for Hassel Free Service
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <LoginPage
              isOpen={isOpen}
              onClose={() => setIsOpen(!isOpen)}
              setActivePage={setActivePage}
            />
          )}
        </>

        // <div className={`sidebar ${isOpen ? "open" : "notOpen"}`}>
        //   <button onClick={toggleLoginSidebar} className="close-btn">
        //     &times;
        //   </button>
        //   <LoginPage
        //     isOpen={isOpen}
        //     onClose={() => setIsOpen(!isOpen)}
        //     setActivePage={setActivePage}
        //   />
        // </div>
      );
    }
  };
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

  // button with trigger sidebar
  const toggleLoginSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddonToggle = (addon: IAddon) => {
    addAddon(addon);
  };

  const changeLocationHandler = () => {
    dispatch(updateBoolean(false));

    // clear previous location from session
    const previousLocation = sessionStorage.getItem("userLocation");
    if (previousLocation) {
      clearLocation();
    }

    const cartItem = JSON.parse(sessionStorage.getItem("cart") as any);
    // Check if cartItem exists, then update its properties
    if (cartItem) {
      cartItem.selectedDate = null; // Reset selectedDate
      cartItem.selectedTimeSlot = null; // Reset selectedTimeSlot

      // Save the updated cartItem back to sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(cartItem));
    }
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
          <div className="flex flex-row justify-between mb-2">
            <div>
              <div className="text-lg sm:text-xl font-bold sm:font-normal">
                Service:-
              </div>
            </div>
            <div className="">
              <button
                className="header-button border-solid border-2"
                onClick={removeFromCart}
              >
                <span>Clear Cart</span>{" "}
                <EmptyCart className="w-6 h-6 inline mb-1.5 text-colorB" />
              </button>
            </div>
          </div>

          {/* Service Information */}
          <div className="service-info">
            <div className="service-card-cart">
              <div>
                <img
                  src={cartItem.service.image[0]}
                  alt="service-image"
                  className="h-14 w-16 sm:h-16"
                />
              </div>
              <div className="text-md sm:text-lg">{cartItem.service.name}</div>
              <div
                className="ml-auto text-xl sm:text-3xl text-colorA font-bold
              sm:font-bold"
              >
                ₹{cartItem.service.cost}
              </div>
            </div>
          </div>

          {/* Addons Section */}
          {addonsInCart.length > 0 && (
            <section>
              <div className="text-lg sm:text-xl font-bold sm:font-normal my-2">
                Addons :-
              </div>
              <div className="addonsSectionCart">
                {cartItem.addons.map(({ addon, quantity }) => (
                  <div key={addon._id} className="addon-card">
                    <img
                      src={addon.imageUrl}
                      alt={addon.name}
                      className="h-14 w-16 sm:h-16"
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
                        // disabled={quantity === 0 ? true : false}
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
              </div>
            </section>
          )}

          {/* Total Price */}
          <div className="total">
            <span className="text-base sm:text-lg text-colorA">Total:</span>
            <span className="text-base sm:text-lg text-colorA">₹{total}</span>
          </div>

          {!isBoolean ? (
            <div className="userEnteraddress mx-4 sm:mx-8">
              <div className="text-lg sm:text-xl font-bold sm:font-normal mb-2">
                Select Location:-
              </div>
              <GoogleLocation />
            </div>
          ) : (
            <>
              {/* Related Addons */}
              {cartItem.addons.length !== cartItem.service.addOns.length && (
                <section className="related-addons">
                  <div className="text-base sm:text-lg font-bold sm:font-normal mb-2">
                    Add Addons Related to this Service :-
                  </div>
                  <div className="related-addons-grid">
                    {cartItem.service.addOns.map(
                      (addon) =>
                        !addonsInCart.find(
                          (item) => item.addon._id === addon._id
                        ) && (
                          <div key={addon._id} className="related-addon-card">
                            <div className="flex flex-row justify-between">
                              <div>
                                <img
                                  src={addon.imageUrl}
                                  alt={addon.name}
                                  className="h-14 w-16 sm:h-16"
                                />
                              </div>
                              <div className="addon-info flex flex-row sm:flex-col justify-between  items-center sm:items-start ml-4">
                                <div className="text-md sm:text-lg font-bold sm:font-normal pr-4 sm:pr-0">
                                  {addon.name}
                                </div>
                                <div className="text-xl sm:text-2xl text-colorA font-bold sm:font-bold">
                                  ₹{addon.cost}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => handleAddonToggle(addon)}
                              disabled={
                                !!addonsInCart.find(
                                  (item) => item.addon._id === addon._id
                                )
                              }
                              className="addon-button-cart ml-auto"
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
                {cartItem.service.workingDays.length > 0 && (
                  <div className="userSelectTime">
                    <div className="text-lg sm:text-xl font-bold sm:font-normal mb-2">
                      Select a Date{" "}
                      {cartItem.service.timeSlots.length > 0 && "& Time"} :-
                    </div>
                    <WorkingDaysCalendar
                      workingDays={cartItem.service.workingDays}
                      timeSlots={cartItem.service.timeSlots}
                    />
                  </div>
                )}
                <div className="useraddress">
                  <div className="text-lg sm:text-xl font-bold sm:font-normal">
                    Selected Location :-
                  </div>
                  <span>{text}</span>
                  <button
                    onClick={changeLocationHandler}
                    className="bg-colorA hover:bg-colorB text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Change Location
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      {/* {isBoolean && (
        <footer>
          <div>
            {!(cartItem.selectedDate || cartItem.selectedTimeSlot) ? (
              <div className="sticky-bar flex">
                <div className="sticky-bar-content">
                  <div>
                    <div className="item-title">Almost There</div>
                    <div className="item-price">
                      Login or Signup to place your order
                    </div>
                  </div>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="mb-1">
                          <button className="cart-button">Proceed</button>
                        </div>
                      </DialogTrigger>
                      {renderDialogContent()}
                    </Dialog>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </footer>
      )} */}
      {isBoolean && (
        <StickyBar
          // setActivePage={setActivePage}
          toggleSidebar={toggleLoginSidebar}
          elementId={"circle-profile-image"}
          buttonName={orderPlaceText}
        />
      )}
      {showLoginDialog()}
    </div>
  );
}
