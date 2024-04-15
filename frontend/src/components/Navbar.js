import { useState } from "react";
import "../style/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../Asset/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav>
        <Link to="/" className="title">
          <img
            src={Logo}
            alt="logo"
            className="img-logo"
            style={{ width: "100px" }}
          />
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {user ? (
          <div>
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="trending">Trending</NavLink>
              </li>
              <li>
                <NavLink to="/collection">Collection</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <span style={{ textAlign: "center", margin: "8px" }}>
                {user.email}
              </span>
              <li>
                <button className="buttonNavbar" onClick={handleClick}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
