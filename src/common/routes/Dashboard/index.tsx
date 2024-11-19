import { Search } from "lucide-react";
import { useState } from "react";
import UserProfileCard from "../../../components/UserProfile";
import Header from "../../components/Header";
import { Input } from "src/magicUi/ui/input";
import { Button } from "src/magicUi/ui/button";
import Loader from "src/common/components/Loader";
import { useUserData } from "../../api/getAndUpdateUser";

const Dashboard: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { userDetails, loading, getUser } = useUserData()

  const handleSearch = async() => {
    if (phoneNumber.length === 10) {
      await getUser(phoneNumber)
      setPhoneNumber("");
    } else {
      window.alert("Enter 10 digit valid number");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <div className="w-5/6 mx-auto">
        <div className="flex gap-2 mb-4">
          <Input
            type="text" // --fix this, need to update type = number and dont want to incress or decress number with up/down arrow key
            placeholder="Enter mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyUp={handleKeyPress}
            className="w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={10}
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="p-2 bg-colorA hover:bg-colorB transition"
            style={{
              color: "white",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
      <div>
        {/* {loading && (
          <div className="text-center mt-4 text-2xl text-gray-500">
            Data Loading...
          </div>
        )} */}
        {/* add error when enter number data not found */}
        {/* {loading && (
          <p className="text-red-500">Error fetching user data</p>
        )} */}
        <Loader isLoading={loading} />
        {userDetails ? (
          <div className="">
            <UserProfileCard user={userDetails} />
          </div>
        ): null}
      </div>
    </>
  );
};

export default Dashboard;
