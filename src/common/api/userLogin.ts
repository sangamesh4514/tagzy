import axios from "axios";
import { useEffect, useState } from "react";
import { IUserProfile } from "../types";
import { clearCart, clearLocation } from "../utils/sessionUtlis";

interface LoginData {
  phoneNumber: string;
  otp: any;
}

export function useUserLogin() {

  // this should sync the session Storage and VerifyOTP
  const [loginInfo, setLoginInfo] = useState<IUserProfile | null>(() => {
    const saveUserInfoToSession = sessionStorage.getItem("userInfo");
    return saveUserInfoToSession ? JSON.parse(saveUserInfoToSession) : null;
  });
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const userSessionData = sessionStorage.getItem("userInfo");
      setLoginInfo(userSessionData ? JSON.parse(userSessionData) : null)
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const getOtp = async (mobileNumber: string) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.get(
        `https://web-production-ff56.up.railway.app/otp/generate/${mobileNumber}`,
        config
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "User has not found, Please Signup"
      );
    } finally {
      setLoadingLogin(false);
    }
  };

  const verifyOtp = async (loginData: LoginData) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `https://web-production-ff56.up.railway.app/otp/verify`,
        loginData,
        config
      );

      if (!data.isUserPro) {
        sessionStorage.setItem("userInfo", JSON.stringify(data))
        setLoginInfo({...data});
      } else {
        setError(
          `This number ${data.phoneNumber} is register as Provider in TagZy. As per the TagZy policy provider can't book the service`
        );
      }
    } catch (err: any) {
      sessionStorage.removeItem("userInfo")
      setLoginInfo(null);
      setError(err?.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoadingLogin(false);
    }
  };

  const userLogout = () => {
    sessionStorage.removeItem('userInfo');
    clearLocation();
    clearCart();
    window.location.reload();
  }

  return {
    getOtp,
    verifyOtp,
    userLogout,
    loginInfo,
    loadingLogin,
    error,
    setError,
  };
}
