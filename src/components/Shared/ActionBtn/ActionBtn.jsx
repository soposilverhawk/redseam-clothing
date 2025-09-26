import React from "react";
import styles from "./ActionBtn.module.css";
import cartIcon from "../../../assets/shopping-cart-white.png";

function ActionBtn({ variant = null, children, width, size, handleClick=null }) {
  return (
    <button
      className={size === "large" ? styles.btnLarge : styles.btnSmall}
      style={{ width: width }}
      onClick={handleClick}
    >
      {variant === "cartAction" && <img src={cartIcon} alt="Shopping cart" />}
      {children}
    </button>
  );
}

export default ActionBtn;
