import "./style.css";
import ContactDialog from "../ContactDialog";

const Header = () => {
  
  return (
    <div className="navWrapper">
      <div className="logoAndText">
        <a href="/">
        <img className="logo" src="/logo.png" alt="logo" />
        </a>
        {/* <span className="name text-[3.5rem] font-semibold">TagZy</span> */}
      </div>
        <div className="navbarItem">
          {/* <a href="/">About</a>
          <a href="/">Contact</a> */}
          <ContactDialog headerView={true} />
        </div>
    </div>
  );
};

export default Header;
