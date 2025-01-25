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
        `${process.env.REACT_APP_BACKEND_URL}/user/phoneNumber/${phoneNumber}`,
        config
      );
      if (data) {
        setUserDetails(data);
      }
    } catch (err: any) {
      console.error("===getUser", err);
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
        `${process.env.REACT_APP_BACKEND_URL}/user/update`,
        inputData,
        config
      );
      if (data) {
        setUserDetails(data);
      }
    } catch (err: any) {
      console.error("===updateUser", err);
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
