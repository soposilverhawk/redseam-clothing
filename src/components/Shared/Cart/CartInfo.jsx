import React, { useState } from "react";
import closeIcon from "../../../assets/cart-close-icon.png";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import styles from "./CartInfo.module.css";
import ROUTES from "../../../routes/Routes";
import { useNavigate } from "react-router-dom";

function CartInfo({ variant = "aside", isEmpty, isOpen, setIsCartOpen }) {
  const navigate = useNavigate();
  const closeCart = () => {
    setIsCartOpen(false);
  };
  const redirectToProducts = () => {
    navigate(ROUTES.HOME);
    setIsCartOpen(false);
  };
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* aside cart header */}
      <div className={styles.sidebarHeader}>
        <h3>
          Shopping cart (<span>0</span>)
        </h3>
        <button aria-label="Close cart" onClick={closeCart}>
          <img src={closeIcon} />
        </button>
      </div>
      {/* aside cart content */}
      {isEmpty && (
        <div className={styles.emptyCartMsgContainer}>
          <img src={emptyCartIcon} alt="empty cart icon" />
          <h4>Ooops!</h4>
          <p>You've got nothing in your cart just yet...</p>
          <ActionBtn size="small" handleClick={redirectToProducts}>
            Start shopping
          </ActionBtn>
        </div>
      )}
    </aside>
  );
}

export default CartInfo;
