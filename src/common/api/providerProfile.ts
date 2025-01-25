import {useEffect, useState} from "react";
import { IUserProfile } from "../types";
import userDataJson from '../components/Profile/data.json'
import axios from "axios";

// User Profile Data
export function useProviderProfile() {

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

        console.log('DATA 1', data)
        if(data) {
          console.log('Data 2', data)
          setProviderProfile(data || userDataJson)
          console.log('Data 3', providerProfile)
          console.log('Data 4', data)
        }
      } catch(err: any) {
        console.log('provider profile', err)
        setProviderProfile(userDataJson)
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