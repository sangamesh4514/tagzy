import axios from "axios";
import { backendUrl } from "../utils/authentication/adminActions";
import { useState } from "react";
import { IUserProfile } from "@/types";

export function useUserData () {
    const [userDetails, setUserDetails] = useState<IUserProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getUser = async(phoneNumber: string) => {
        setUserDetails(null)
        try{
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.get(`${backendUrl}/user/phoneNumber/${phoneNumber}`, config)
            if(data) {
                setUserDetails(data)
            }
        }
        catch(err) {
            console.log(err)
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
    }

    const updateUser = async(inputData: IUserProfile) => {
        try{
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(`${backendUrl}/user/update`, inputData, config)
            if(data) {
                console.log('updated user data', data)
                await getUser(data?.phoneNumber)
                setUserDetails(data)
                setLoading(false)
            }
        }
        catch(err) {
            console.log(err)
            setLoading(false)
        }
    }
    
    return {
        getUser,
        updateUser,
        loading,
        userDetails
    }
}