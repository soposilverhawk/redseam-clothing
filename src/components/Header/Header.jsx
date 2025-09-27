import React from "react";
import logo from "../../assets/RedSeam-logo.png";
import cartImg from "../../assets/shopping-cart-black.png";
import userImg from "../../assets/user.png";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/Routes";
import { useAuth } from "../../context/AuthContext";
import userIcon from "../../assets/user.png";

function Header({ openCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();
  console.log(user);
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
        {location.pathname !== ROUTES.LOGIN &&
          location.pathname !== ROUTES.REGISTER && (
            <button onClick={openCart}>
              <img src={cartImg} alt="Shopping cart" />
            </button>
          )}
        {!user && !token ? (
          <button onClick={() => navigate(ROUTES.LOGIN)}>
            <img src={userImg} alt="Avatar icon" />
            Log in
          </button>
        ) : user?.avatar ? (
          <img
            src={user.avatar}
            alt="user avatar"
            className={styles.userAvatar}
          />
        ) : (
          <div className={styles.userAvatarDefault}>
            <img src={userIcon} alt="default userIcon" />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
