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
    setCartItem({ service, addons: [], selectedDate: null, selectedTimeSlot: null });
  };

  const removeFromCart = () => {
    setCartItem(null);
  };

  const addAddon = (addon: IAddon) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        addons: [...cartItem.addons, { addon, quantity: 1 }],
      });
    }
  };

  const removeAddon = (addonId: string) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        addons: cartItem.addons.filter((item) => item.addon._id !== addonId),
      });
    }
  };

  const incrementAddon = (addonId: string) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        addons: cartItem.addons.map((item) =>
          item.addon._id === addonId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    }
  };

  const decrementAddon = (addonId: string) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        addons: cartItem.addons.map((item) =>
          item.addon._id === addonId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    }
  };

  const setSelectedDate = (date: string) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        selectedDate: date,
      });
    }
  };

  const setSelectedTimeSlot = (timeSlot: string) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        selectedTimeSlot: timeSlot,
      });
    }
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
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

