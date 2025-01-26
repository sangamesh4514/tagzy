import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";

import "../styles/service-booking.css";
import { Button } from "../../ui/button";
import { useCart } from "../context/CartContext";
import type { IAddon } from "src/common/types";
import type { Page } from "../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "src/magicUi/ui/dialog";
import { WorkingDaysCalendar } from "./WorkingDaysCalendar";
import GoogleLocation from "./LocationFetcher";
import type { RootState } from "src/common/store/store";
import { updateBoolean } from "../dataSlice";
import StickyBar from "./StickyBar";
import LoginPage from "./Login";
import { clearLocation, getUserInfo } from "src/common/utils/sessionUtlis";
import { CartItems } from "./CartItems";
import Loader from "../../Loader";

interface ServiceBookingProps {
  setActivePage: (page: Page) => void;
}

const MemoizedWorkingDaysCalendar = React.memo(WorkingDaysCalendar);
const MemoizedGoogleLocation = React.memo(GoogleLocation);

export default function ServiceBooking({ setActivePage }: ServiceBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaceText, setOrderPlaceText] = useState("Login User");
  const dispatch = useDispatch();
  const { isBoolean, text } = useSelector((state: RootState) => state.data);
  const {
    cartItem,
    removeFromCart,
    addAddon,
  } = useCart();
  const addonsInCart = cartItem?.addons || [];
  const userInfo = getUserInfo();

  // Load the Google Maps script and Places library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY || "",
    libraries: ["places"], // Load the Places library
  });

  if (!isLoaded) return <Loader isLoading={!isLoaded} />;
  // if (!isLoaded) return <div>Loading...</div>

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

  const showLoginDialog = () => {
    if (userInfo) {
      setOrderPlaceText("Place Order");
      return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DialogContent className="bg-white" style={{ height: "250px" }}>
            <DialogHeader>
              <DialogDescription>Your order placed</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }

    if (!(cartItem?.selectedDate && cartItem?.selectedTimeSlot)) {
      // setOrderPlaceText('Select Time and Date')
      return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DialogContent className="bg-white" style={{ height: "250px" }}>
            <DialogHeader>
              <DialogDescription>
                Please select Date and Time for Hassle-Free Service
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <LoginPage
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        setActivePage={setActivePage}
      />
    );
  };

  const toggleLoginSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddonToggle = (addon: IAddon) => {
    addAddon(addon);
  };

  const changeLocationHandler = () => {
    dispatch(updateBoolean(false));

    const previousLocation = sessionStorage.getItem("userLocation");
    if (previousLocation) {
      clearLocation();
    }

    const cartItem = JSON.parse(sessionStorage.getItem("cart") as any);
    if (cartItem) {
      cartItem.selectedDate = null;
      cartItem.selectedTimeSlot = null;

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

  return (
    <div className="service-booking">
      <main>
        <section className="service-section">
          {cartItem ? (
            <CartItems cartItem={cartItem} removeFromCart={removeFromCart} />
          ) : (
            <div className="cart">
              <h1 className="cart-header">
                Cart <ShoppingCart />
              </h1>
              <h2 style={{ fontSize: "20px" }}>Your Cart is Empty</h2>
            </div>
          )}

          {/* Total Price */}
          {cartItem && (
            <div className="total">
              <span className="text-base sm:text-lg text-colorA">Total:</span>
              <span className="text-base sm:text-lg text-colorA">
                ₹{getTotal()}
              </span>
            </div>
          )}

          {!isBoolean ? (
            <div className="userEnteraddress mx-4 sm:mx-8">
              <div className="text-lg sm:text-xl font-bold sm:font-normal mb-2">
                Select Location:-
              </div>
              <MemoizedGoogleLocation />
            </div>
          ) : (
            <>
              {/* Related Addons */}
              {cartItem &&
                cartItem.addons.length !== cartItem.service.addOns.length && (
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
                                    src={addon.imageUrl || "/placeholder.svg"}
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
                {cartItem && cartItem.service.workingDays.length > 0 && (
                  <div className="userSelectTime">
                    <div className="text-lg sm:text-xl font-bold sm:font-normal mb-2">
                      Select a Date{" "}
                      {cartItem.service.timeSlots.length > 0 && "& Time"} :-
                    </div>
                    <MemoizedWorkingDaysCalendar
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

      {isBoolean && cartItem && (
        <StickyBar
          toggleSidebar={toggleLoginSidebar}
          elementId={"circle-profile-image"}
          buttonName={orderPlaceText}
        />
      )}
      {showLoginDialog()}
    </div>
  );
}
