import React from "react";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import styles from "./CartInfo.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";

function EmptyCart({
  loading,
  cartItems,
  clickEvent,
  token,
  variant,
}) {
  return (
    <>
      {((!loading && cartItems.length === 0) || !token) && (
        <div className={styles.emptyCartMsgContainer}>
          <img src={emptyCartIcon} alt="empty cart icon" />
          <h4>Ooops!</h4>
          <p>You've got nothing in your cart just yet...</p>
          <ActionBtn size={variant === "sidebar" ? "small" : "large"} width={variant !== "sidebar" ? "100%" : ""} handleClick={clickEvent}>
            {variant === "sidebar" ? "start shopping" : "Continue shopping"}
          </ActionBtn>
        </div>
      )}
    </>
  );
}

export default EmptyCart;
