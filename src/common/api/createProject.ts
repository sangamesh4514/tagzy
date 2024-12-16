import axios from "axios";
import { backendUrl } from "../utils/authentication/adminActions";
import { useState } from "react";
import { Booking } from "../types";

export function useCreatePorject () {
    const [projectInfo, setProjectInfo] = useState<Booking | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const projectCreation = async (payload: any) => {
        setLoading(true);
        setError(null);
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            `${backendUrl}/project/create`,
            payload,
            config
          );
          if(data) {
            setProjectInfo(data)
          }
        } catch (err: any) {
          console.error("===getUser", err);
          setError(err?.response?.data?.message || "User has not found, Please Signup");
        } finally {
          setLoading(false);
        }
    };

    return {
        projectCreation,
        loading,
        error,
        projectInfo
    }
}