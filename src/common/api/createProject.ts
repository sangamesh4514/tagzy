import axios from "axios";
import { useState } from "react";
import { Booking } from "../types";

export function useCreatePorject() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<Booking | null>(null)
  
  const projectCreation = async (payload: Booking | null) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `https://web-production-ff56.up.railway.app/project/create`,
        payload,
        config
      );
      if (data) {
        setProjectInfo(data);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "User has not found, Please Signup"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    projectCreation,
    loading,
    error,
    projectInfo,
  };
}
