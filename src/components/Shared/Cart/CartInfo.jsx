import React, { useState } from "react";
import closeIcon from "../../../assets/close-icon.png";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import styles from "./CartInfo.module.css";

function CartInfo({variant = "aside", isEmpty, isOpen, setIsCartOpen}) {
  const closeCart = () => {
    setIsCartOpen(false);
  }
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* aside cart header */}
      <div>
        <h3>
          Shopping cart (<span>0</span>)
        </h3>
        <button aria-label="Close cart" onClick={closeCart}>
          <img src={closeIcon} />
        </button>
      </div>
      {/* aside cart content */}
      {isEmpty && (
        <div>
          <img src={emptyCartIcon} alt="empty cart icon" />
          <h4>Ooops!</h4>
          <p>You've got nothing in your cart just yet...</p>
          <ActionBtn size="small">Start shopping</ActionBtn>
        </div>
      )}
    </aside>
  );
}

export default CartInfo;
