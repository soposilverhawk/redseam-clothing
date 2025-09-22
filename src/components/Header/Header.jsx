import React from "react";
import logo from "../../assets/RedSeam-logo.png";
import cartImg from "../../assets/shopping-cart-black.png";
import userImg from "../../assets/user.png";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/Routes";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <button
        className={styles.logoContainer}
        onClick={() => navigate(ROUTES.HOME)}
      >
        <img
          src={logo}
          alt="RedSeam Logo, orange hand with an eye inside it - "
        />
        <p>RedSeam Clothing</p>
      </button>
      <div className={styles.userPanelContainer}>
        {location.pathname !== ROUTES.LOGIN && location.pathname !== ROUTES.REGISTER && (
          <button>
            <img src={cartImg} alt="Shopping cart" />
          </button>
        )}
        <button onClick={() => navigate(ROUTES.LOGIN)}>
          <img src={userImg} alt="Avatar icon" />
          Log in
        </button>
      </div>
    </header>
  );
}

export default Header;
