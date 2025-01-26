import { CartItem, ILocation, IUserProfile } from "../types";

// Helper functions for sessionStorage management

// cartItem
// export const saveCartToStorage = (cart: CartItem | null) => {
//   if (cart) {
//     sessionStorage.setItem("cart", JSON.stringify(cart));
//   } else {
//     sessionStorage.removeItem("cart");
//   }
// };

// export const loadCartFromStorage = (): CartItem | null => {
//   const storedCart = sessionStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : null;
// };


// userInfo
export const saveUserInfo = (userInfo: IUserProfile) => {
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getUserInfo = (): IUserProfile | null => {
  const storedUserInfo = sessionStorage.getItem("userInfo");
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
};

export const clearUserInfo = () => {
  sessionStorage.removeItem("userInfo");
};

// User location

export const saveLocationToSession = (location: ILocation) => { 
  const locationData = {
    coordinates: location.coordinates,
    name: location.name,
    type: location.type
  };
  // Save as a JSON string in sessionStorage
  sessionStorage.setItem("userLocation", JSON.stringify(locationData));
};

export const getLocationFromSession = (): ILocation | null => {
  const locationData = sessionStorage.getItem("userLocation");
  if (locationData) {
    return JSON.parse(locationData);
  }
  return null; // Return null if no location is stored
};

export const clearLocation = () => {
  sessionStorage.removeItem("userLocation")
}