import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  // Function to render menu items based on the login state
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <div className="user">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.ErI83UXKIflX1WHxPmgF8AHaHa&pid=Api&P=0&h=220"
              alt="User Avatar"
            />
            <span>Rishav</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
            <Link to="/logout" className="logout">
              Logout
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">Sign in</Link>
          <Link to="/register" className="register">
            Sign up
          </Link>
        </>
      );
    }
  };

  // Function to render navigation links based on the login state
  const RenderNavLinks = () => {
    if (state) {
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/aboutPage">About</Link>
          <Link to="/list">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
        </>
      );
    }
    return null; // Do not render links if the user is not logged in
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Future Ready</span>
        </Link>
        <RenderNavLinks />
      </div>
      <div className="right">
        {/* Render menu based on user's login state */}
        <RenderMenu />

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <RenderNavLinks />
          {/* Render menu in mobile dropdown as well */}
          <RenderMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
