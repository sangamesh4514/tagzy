import "./style.css";
import { useAppDispatch } from "../../../app/hook";
import { logout } from "../../../common/utils/authentication/adminSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const serachPath = window.location.pathname === "/admin/dashboard";

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className="navWrapper">
      <div className="logoAndText">
        <img className="logo" src="/logo.png" alt="logo" />
        {/* <span className="name text-[3.5rem] font-semibold">TagZy</span> */}
      </div>
      {serachPath ? (
        <div>
          <button
            type="button"
            className="bg-colorA hover:bg-colorB w-full font-medium rounded-lg text-md px-5 py-2.5 me-2 my-2 tracking-wide"
            onClick={logoutHandler}
            style={{ color: "white" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="navbarItem">
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Header;
