import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";

import "../styles/service-booking.css";
import { Button } from "../../ui/button";
import { getCartFromStorage, saveCartToStorage, useCart } from "../context/CartContext";
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
import { updatedLocationFound } from "../dataSlice";
import StickyBar from "./StickyBar";
import LoginPage from "./Login";
import { clearLocation, getLocationFromSession, getUserInfo } from "src/common/utils/sessionUtlis";
import { CartItems } from "./CartItems";
import Loader from "../../Loader";
import { useCreatePorject } from "src/common/api/createProject";
import { transformOrderPlacePayload } from "./orderPlace/utlis";

interface ServiceBookingProps {
  setActivePage: (page: Page) => void;
}

const MemoizedWorkingDaysCalendar = React.memo(WorkingDaysCalendar);
const MemoizedGoogleLocation = React.memo(GoogleLocation);

export default function ServiceBooking({ setActivePage }: ServiceBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaceText, setOrderPlaceText] = useState("Login User");
  const dispatch = useDispatch();
  const { isLocationFound, text } = useSelector((state: RootState) => state.data);
  const {
    cartItem,
    removeFromCart,
    addAddon,
    setSelectedDate,
    setSelectedTimeSlot
  } = useCart();
  const addonsInCart = cartItem?.addons || [];
  const userSessionData = getUserInfo();
  const cartSessionData = getCartFromStorage()
  const userLocationSessionData = getLocationFromSession()
  const { projectCreation } = useCreatePorject()

  const projectPlaceHandler = () => {
    setIsOpen(!isOpen);
    removeFromCart()
  }

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
    let dialogContent;

  
    // Check if date and time are not selected first
    if (!(cartItem?.selectedDate || cartItem?.selectedTimeSlot)) {
      dialogContent = (
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
    // If userSessionData is available and date/time are selected
    else if (userSessionData) {
      // Update order place text only if necessary
      if (orderPlaceText !== "Place Order") {
        setOrderPlaceText("Place Order");
      }
  
      dialogContent = (
        <Dialog open={isOpen} onOpenChange={projectPlaceHandler}>
          <DialogContent className="bg-white" style={{ height: "250px" }}>
            <DialogHeader>
              <DialogDescription className="text-center font-bold text-lg">Thankyou, your order has been placed.</DialogDescription>
              <DialogDescription className="text-center font-semibold text-lg">For tracking your order, Please download the App.</DialogDescription>
              <DialogDescription>
                <div className="flex flex-row justify-around items-center space-y-3 mt-8">
                  <div>
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/appstore.jpeg"
                        alt="Download on the App Store"
                        className="h-10"
                        width="140px"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/assets/playStore.jpeg"
                        alt="Get it on Google Play"
                        className="h-10 mb-2.5"
                        width="140px"
                      />
                    </a>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
    // Otherwise, show the login page
    else {
      dialogContent = (
        <LoginPage
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          setActivePage={setActivePage}
        />
      );
    }
  
    return dialogContent;
  };
  

  const ToggleLoginSidebar = async() => {
    setIsOpen(!isOpen);
    if(userSessionData && cartSessionData && userLocationSessionData){
      const orderPlacePayload = transformOrderPlacePayload(
        cartSessionData,
        userSessionData,
        userLocationSessionData
      )

      await projectCreation(orderPlacePayload)
    }
  };

  const handleAddonToggle = (addon: IAddon) => {
    addAddon(addon);
  };

  const changeLocationHandler = () => {
    dispatch(updatedLocationFound(false));
    const previousLocation = sessionStorage.getItem("userLocation");
    const cartSessionData = getCartFromStorage()

    // clear location from session
    if (previousLocation) {
      clearLocation();
    }

    if(cartSessionData) {
      //null value of date and time from session and context
      cartSessionData.selectedDate = null;
      cartSessionData.selectedTimeSlot = null;
      setSelectedDate("")
      setSelectedTimeSlot("")

      // save and update cartItem session
      saveCartToStorage(cartSessionData)
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

          {!isLocationFound ? (
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

      {isLocationFound && cartItem && (
        <StickyBar
          toggleSidebar={ToggleLoginSidebar}
          elementId={"circle-profile-image"}
          buttonName={orderPlaceText}
        />
      )}
      {showLoginDialog()}
    </div>
  );
}
