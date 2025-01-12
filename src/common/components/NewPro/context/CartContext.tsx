import React, { createContext, useContext, useState } from 'react';
import { CartItem, IAddon, Service } from 'src/common/types';

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

  // add service to cart fun.
  const addToCart = (service: Service) => {
    setCartItem(prevCartItem => ({
      service,
      addons: [],
      selectedDate: null,
      selectedTimeSlot: null
    }));
  };

  // remove service from cart
  const removeFromCart = () => {
    setCartItem(null);
  };

  // add add-on with service
  const addAddon = (addon: IAddon) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: [...prevCartItem!.addons, { addon, quantity: 1 }]
    }));
  };

  // remove add-on
  const removeAddon = (addonId: string) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.filter(item => item.addon._id !== addonId)
    }));
  };

  // update add quantity in service
  const updateAddonQuantity = (addonId: string, change: number) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.map(item =>
        item.addon._id === addonId ? { ...item, quantity: item.quantity + change } : item
      )
    }));
  };  

  // increment add-on with service
  const incrementAddon = (addonId: string) => {
    updateAddonQuantity(addonId, 1);
  };

  // decrement add-on 
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

  // user booking time slot
  const setSelectedTimeSlot = (timeSlot: string) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      selectedTimeSlot: timeSlot
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
        setSelectedTimeSlot
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
