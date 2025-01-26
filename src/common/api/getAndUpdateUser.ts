import axios from "axios";
import { useState } from "react";
import { IUserProfile } from "../types";

export function useUserData() {
  const [userDetails, setUserDetails] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `https://web-production-ff56.up.railway.app/user/phoneNumber/${phoneNumber}`,
        config
      );
      if (data) {
        setUserDetails(data);
      }
    } catch (err: any) {
      setUserDetails(null);
      setError(err?.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (inputData: IUserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `https://web-production-ff56.up.railway.app/user/update`,
        inputData,
        config
      );
      if (data) {
        setUserDetails(data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return {
    getUser,
    updateUser,
    loading,
    userDetails,
    error
  };
}
