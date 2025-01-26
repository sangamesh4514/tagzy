import { useState} from "react";
import { IUserProfile } from "../types";
import axios from "axios";

// User Profile Data
export const useProviderProfile = () => {

    const [providerProfile, setProviderProfile] = useState<IUserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<String | null>(null)

    const getProviderProfile = async(userId: String) => {
      setLoading(true)
      setErr(null)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/Id/${userId}`,
          config
        )

        if(data) {
          setProviderProfile(data)
        }
      } catch(err: any) {
       
        setErr(err?.response?.data?.message || 'Failed to fetch provdier profile.')
      } finally {
        setLoading(false)
      }
    }

    return {
        providerProfile,
        loading,
        err,
        getProviderProfile
    }
}