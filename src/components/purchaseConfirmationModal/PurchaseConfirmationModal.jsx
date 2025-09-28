import React from "react";
import styles from "./PurchaseConfirmationModal.module.css";
import closeIcon from "../../assets/cart-close-icon.png";
import successIcon from "../../assets/success-icon.png";
import ActionBtn from "../Shared/ActionBtn/ActionBtn";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/Routes";

function PurchaseConfirmationModal({ setIsSuccessModalOpen }) {
  const navigate = useNavigate();
  return (
    <div className={styles.successWrapper}>
      {/* exit modal container */}
      <div className={styles.exitModalContainer}>
        <button
          aria-label="Close purchase confirmation modal"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
      {/* success message container */}
      <div className={styles.successMsgContainer}>
        <div
          aria-label="successful purchase icon"
          className={styles.successOutline}
        >
          <img src={successIcon} />
        </div>
        <h3>Congrats!</h3>
        <p>Your order is placed successfully!</p>
      </div>
      <ActionBtn size="small" handleClick={() => navigate(ROUTES.HOME)}>
        Continue shopping
      </ActionBtn>
    </div>
  );
}

export default PurchaseConfirmationModal;
