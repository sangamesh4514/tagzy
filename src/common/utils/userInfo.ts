import { IUserProfile } from "../types";

// Helper functions for sessionStorage management
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
