import axios from "axios";
import { useState } from "react";
import { IUserProfile } from "../types";

interface LoginData {
  phoneNumber: string;
  otp: any;
}

export function useUserLogin() {
  const [loginInfo, setLoginInfo] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getOtp = async (mobileNumber: string) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const verifyOtp = async (loginData: LoginData) => {
    setLoading(true);
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
        setLoginInfo(data);
      } else {
        setError(
          `This number ${data.phoneNumber} is register as Provider in TagZy. As per the TagZy policy provider can't book the service`
        );
      }
    } catch (err: any) {
      setLoginInfo(null);
      setError(err?.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return {
    getOtp,
    verifyOtp,
    loginInfo,
    loading,
    error,
    setError,
  };
}
