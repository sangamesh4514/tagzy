import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import UserSearch from "../User Search";
import Createtags from "../Create Tgas";
import Analytics from "../Analytics";
import BlankScreen from "../ui/BlankScreen";
import { useAppDispatch } from "../../hooks/hook";
import { logout } from "../../../common/utils/authentication/adminSlice";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  // sidebar component
  const componentOne = <UserSearch />
  const componentTwo = <Createtags />
  const componentThree = <Analytics />
  const componentFour = <BlankScreen />

  // active page on the right
  const [activePage, setActivePage] = useState<any>(componentFour)

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/admin/login");
  };



  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-screen">

        {/* left section */}
        <div className="col-span-1 bg-slate-200 h-full flex flex-col">

          {/* First Card */}
          <div className="bg-white flex items-center justify-between h-[7%] m-4">
            <div className="w-10 h-10">
              <img className="logo" src="/logo.png" alt="logo" />
            </div>
            <div className="font-extrabold text-colorB text-3xl">
              TagZy
            </div>
            <div>
              <button
                type="button"
                className="bg-colorA hover:bg-colorB border-1 mr-2.5 text-colorB font-medium text-sm px-2 py-2"
                style={{ color: "white" }}
                >
                  <AlignJustify />
                </button>
            </div>
          </div>

          {/* Horizontal Bar */}
          <hr className="mx-4 h-1 bg-white border-0 my-1 dark:bg-gray-700" />

          {/* Second Card */}
          <div className="bg-white p-4 flex-grow m-4">
            <div className=" font-medium text-lg text-gray-600">
              Menu
            </div>
            <div className="flex justify-center m-2 mb-4">
              <button
                type="button"
                className="bg-colorA hover:bg-colorB border-1 w-3/4 text-colorB font-medium text-sm px-2 py-2"
                onClick={() => setActivePage(componentOne)}
                style={{ color: "white" }}
              >
                User Search
              </button>
            </div>
            <div className="flex justify-center m-2 mb-4">
              <button
                type="button"
                className="bg-colorA hover:bg-colorB border-1 w-3/4 text-colorB font-medium text-sm px-2 py-2"
                onClick={() => setActivePage(componentTwo)}
                style={{ color: "white" }}
              >
                Create Tags
              </button>
            </div>
            <div className="flex justify-center m-2">
              <button
                type="button"
                className="bg-colorA hover:bg-colorB border-1 w-3/4 text-colorB font-medium text-sm px-2 py-2"
                onClick={() => setActivePage(componentThree)}
                style={{ color: "white" }}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Horizontal Bar */}
          <hr className="mx-4 h-1 bg-white border-0 my-1 dark:bg-gray-700" />

          {/* Third Card */}
          <div className="bg-white p-4 h-[7%] flex items-center m-4">
            {/* <div className="flex  m-2"> */}
              <button
                type="button"
                className="bg-colorA hover:bg-colorB border-1 w-full text-colorB font-medium text-sm px-2 py-2 mx-auto"
                onClick={logoutHandler}
                style={{ color: "white" }}
              >
                Logout
              </button>
            {/* </div> */}
          </div>

        </div>

        {/* Right Section */}
        <div className="col-span-3 bg-slate-200 flex items-center justify-center h-full overflow-hidden">
          <div className="mx-4 w-screen bg-white h-[96%] overflow-y-scroll">
            {activePage}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar