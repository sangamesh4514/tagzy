import React, { createContext, useContext, useState } from 'react';
import { CartItem, IAddon, Service } from 'src/common/types';

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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const addToCart = (service: Service) => {
    setCartItem(prevCartItem => ({
      service,
      addons: [],
      selectedDate: null,
      selectedTimeSlot: null
    }));
  };

  const removeFromCart = () => {
    setCartItem(null);
  };

  const addAddon = (addon: IAddon) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: [...prevCartItem!.addons, { addon, quantity: 1 }]
    }));
  };

  const removeAddon = (addonId: string) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.filter(item => item.addon._id !== addonId)
    }));
  };

  const updateAddonQuantity = (addonId: string, change: number) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      addons: prevCartItem!.addons.map(item =>
        item.addon._id === addonId ? { ...item, quantity: item.quantity + change } : item
      )
    }));
  };

  const incrementAddon = (addonId: string) => {
    updateAddonQuantity(addonId, 1);
  };

  const decrementAddon = (addonId: string) => {
    updateAddonQuantity(addonId, -1);
  };

  const setSelectedDate = (date: string) => {
    setCartItem(prevCartItem => ({
      ...prevCartItem!,
      selectedDate: date
    }));
  };

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
