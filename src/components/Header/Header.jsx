import React from "react";
import "./Header.css";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LOGO_IMG from "../../assets/logo.png";
import { logoutUser } from "../../redux/auth/authAction";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const afterLogout = () => {
    router("/");
  };

  const handleLogout = () => {
    dispatch(logoutUser(afterLogout));
  };

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-dropdown">
              <div>
                <Link to={"/dashboard"}>
                  <img src={LOGO_IMG} alt="LOGO_IMG" />
                </Link>
              </div>

    <ul className="pages-ul">
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/our-fleets">Our Fleets</Link>
      </li>
      <li>
        <Link to="/testimonials">Testimonials</Link>
      </li>
      <li>
        <Link to="/booked-details">Booked Details</Link>
      </li>
      <li>
        <Link to="/contact-queries">Contact Query Details</Link>
      </li>
    </ul>

              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserAlt />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
