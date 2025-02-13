import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "src/magicUi/ui/dialog";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUserProfile } from "src/common/types";
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
        setUserData(data);
        dispatch(setMobileNumber(data.phoneNumber));

        // Re-fetch cart and location session data to ensure they're current
        const currentCartSessionData = sessionStorage.getItem('cartInfo');
        const currentUserLocationSessionData = sessionStorage.getItem('userLocation');

        // clear cart from session if provider profile changes
        if (currentCartSessionData && currentUserLocationSessionData) {
          sessionStorage.removeItem('cartInfo');
          sessionStorage.removeItem('userLocation');
        }
      } catch (error) {
        setUserData(userDataJson);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, dispatch]);

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

export const renderDialogContent = (name?: string) => {
  return (
    <DialogContent className="bg-white" style={{ height: "250px" }}>
      <DialogHeader>
        <DialogTitle className="text-black">
          {name && "Book"} {name}
        </DialogTitle>
        <DialogDescription>
          {/* Scan the QR code or download our app to book this service */}
          Please select Date and Time for Hassel Free Service
        </DialogDescription>
      </DialogHeader>
      {/* <div className="grid gap-6">
        <div className="mx-auto">
          <img
            src="/placeholder.svg?height=200&width=200"
            alt="QR Code"
            className="w-48 h-48 object-contain"
          />
          Download App
        </div>
        <div className="flex justify-center gap-4">
          <img
            src="/placeholder.svg?height=40&width=135"
            alt="Download on Play Store"
            className="h-12 object-contain"
          />
          <img
            src="/placeholder.svg?height=40&width=135"
            alt="Download on App Store"
            className="h-12 object-contain"
          />
          <a
            href="https://apps.apple.com/in/app/tagzy/id6737283128"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              borderRadius: "10px",
              overflow: "hidden",
              width: "140px",
              height: "40px", // Adjust height to avoid inner black padding
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src="/assets/appstore.png"
              alt="Download on the App Store"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              borderRadius: "10px",
              overflow: "hidden",
              width: "140px",
              height: "40px", // Adjust height to match the image size
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src="/assets/playStore.png"
              alt="Get it on Google Play"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            />
          </a>
        </div>
      </div> */}
    </DialogContent>
  );
};
