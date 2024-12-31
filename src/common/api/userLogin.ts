import axios from "axios";
import { backendUrl } from "../utils/authentication/adminActions";
import { useState } from "react";
import { IUserProfile } from "../types";

interface LoginData {
    phoneNumber: string
    otp: any
}

export function useUserLogin () {
    const [loginInfo, setLoginInfo] = useState<IUserProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getOtp = async (mobileNumber: string) => {
        setLoading(true);
        setError(null);
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axios.get(
            `${backendUrl}/otp/generate/${mobileNumber}`,
            config
          );
          console.log('###data',data);
        } catch (err: any) {
          console.error("===getUser", err);
          setError(err?.response?.data?.message || "User has not found, Please Signup");
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
            `${backendUrl}/otp/verify`,
            loginData,
            config
          );
          if (data) {
            setLoginInfo(data);
          }
        } catch (err: any) {
          console.error("===getUser", err);
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
        error
    }
}