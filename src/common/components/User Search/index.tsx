import React, { useState } from 'react'
import { Input } from "src/magicUi/ui/input";
import { Button } from "src/magicUi/ui/button";
import UserProfileCard from "../../components/UserProfile";
import { useUserData } from "../../api/getAndUpdateUser";
import { Search } from "lucide-react";
import Loader from "src/common/components/Loader";


const UserSearch = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const { userDetails, loading, error, getUser } = useUserData(); // Included error state for better error handling
    console.log("===Dashboard");

    const handleSearch = async () => {
        if (phoneNumber.length === 10) {
        await getUser(phoneNumber);
        setPhoneNumber("");
        } else {
        window.alert("Enter a valid 10-digit number");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        handleSearch();
        }
    };
    return (
        <>
        <div className="w-full mx-auto">
            <div className="flex gap-2 m-4">
                {/* Search button */}
                <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    onKeyUp={handleKeyPress}
                    className="w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    maxLength={10}
                />
                <Button
                    onClick={handleSearch}
                    disabled={loading}
                    className="p-2 bg-colorA hover:bg-colorB transition flex items-center gap-2 text-white"
                >
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
            </div>
        </div>
        <div>
            {error && (
            <p className="text-center text-red-500 mt-4">
                {error || "User not found"}
            </p>
            )}
            <Loader isLoading={loading} />
            {userDetails && <UserProfileCard user={userDetails} />}
        </div>
        </>
    )
}

export default UserSearch