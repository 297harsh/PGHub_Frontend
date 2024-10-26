import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../../context/UserData";
import "./Navbar.css";
import logo from "../../assets/pghub/logo.png";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the navbar
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handelLogin = () => {
    navigate("./signin");
  };
  const handleOnProfile = () => {
    if (user.role == "owner") {
      return navigate("./owner");
    }
    if (user.role == "renter") {
      return navigate("./renter");
    }
    if (user.role == "admin") {
      return navigate("./admin");
    }
    console.log(4);
    return navigate("./");
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-left">
        <img src={logo} alt="Website Logo" className="logo" />
        <span className="website-name">PGHub</span>
      </div>

      <div className={`navbar-right ${isMobile ? "mobile-menu-active" : ""}`}>
        <ul className="nav-options">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#about-us">About Us</a>
          </li>
          <li>
            <a href="/#contact-us">Contact Us</a>
          </li>
        </ul>

        {user ? (
          <IconButton onClick={handleOnProfile}>
            <Avatar
              src={user.profilePicture}
              alt={user.userName}
              sx={{
                width: 40,
                height: 40,
                m: 0,
              }}
            />
          </IconButton>
        ) : (
          <button className="login-button" onClick={handelLogin}>
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
