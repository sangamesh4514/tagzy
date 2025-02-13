import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, IAddon, Service } from "src/common/types";

// Cart context type
interface CartContextType {
  cartItem: CartItem | null;
  addToCart: (service: Service) => void;
  removeFromCart: () => void;
  addAddon: (addon: IAddon) => void;
  removeAddon: (addonId: string) => void;
  incrementAddon: (addonId: string) => void;
  decrementAddon: (addonId: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (timeSlot: string) => void;
}

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    if(cartItem) {
      sessionStorage.setItem("cartInfo",JSON.stringify(cartItem));
    } else {
      sessionStorage.removeItem("cartInfo")
    }
  }, [cartItem]);

  // Add service to cart
  const addToCart = (service: Service) => {
    setCartItem({
      service,
      addons: [],
      selectedDate: null,
      selectedTimeSlot: null,
    });
  };

  // Remove service from cart
  const removeFromCart = () => {
    setCartItem(null);
  };

  // Add add-on with service
  const addAddon = (addon: IAddon) => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem!,
      addons: [...prevCartItem!.addons, { addon, quantity: 1 }],
    }));
  };

  // Remove add-on
  const removeAddon = (addonId: string) => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.filter((item) => item.addon._id !== addonId),
    }));
  };

  // Update add-on quantity
  const updateAddonQuantity = (addonId: string, change: number) => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.map((item) => {
        const newQuantity =
          item.addon._id === addonId ? item.quantity + change : item.quantity;

        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
        };
      }),
    }));
  };

  // Increment add-on quantity
  const incrementAddon = (addonId: string) => {
    updateAddonQuantity(addonId, 1);
  };

  // Decrement add-on quantity
  const decrementAddon = (addonId: string) => {
    updateAddonQuantity(addonId, -1);
  };

  // user booking date selection
  const setSelectedDate = (date: string) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      selectedDate: date
    }));
  };

  // Set selected time slot
  const setSelectedTimeSlot = (timeSlot: string) => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem!,
      selectedTimeSlot: timeSlot,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        addAddon,
        removeAddon,
        incrementAddon,
        decrementAddon,
        setSelectedDate,
        setSelectedTimeSlot,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
