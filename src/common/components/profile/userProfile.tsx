import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartItem, IUserProfile } from "src/common/types";
import NewPro from "../NewPro";
import Header from "../Header";
import Footer from "../Footer";
import userDataJson from "./data.json";
import { useAppDispatch } from "src/common/hooks/hook";
import { setMobileNumber } from "src/common/utils/providerProfile/providerProfileSlice";

const ProProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://web-production-ff56.up.railway.app/user/id/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: IUserProfile = await response.json();

        if (data) {
          setUserData(data);
          dispatch(setMobileNumber(data.phoneNumber));
        }

        // ** Fetch the latest cart session data ** (instead of using stale state)
        const currentCartSessionData: CartItem | null = sessionStorage.getItem(
          "cartInfo"
        )
          ? JSON.parse(sessionStorage.getItem("cartInfo") as string)
          : null;

        // ** Fix: Compare the latest cart data, not the stale one **
        if (
          !(
            currentCartSessionData &&
            data._id === currentCartSessionData.service?.proId
          )
        ) {
          sessionStorage.removeItem("cartInfo");
          sessionStorage.removeItem("userLocationInfo");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(userDataJson);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, dispatch]); // **No cartSessionData in dependencies to avoid stale data**

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%", fontSize: 42 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData || !userData.isUserPro) {
    //create page
    return (
      <div style={{ textAlign: "center", marginTop: "20%", fontSize: 42 }}>
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <NewPro userProfile={userData} />
      <Footer />
    </>
  );
};

export default ProProfile;

