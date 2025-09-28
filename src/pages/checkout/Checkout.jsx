import React from "react";
import styles from "./Checkout.module.css";
import CartInfo from "../../components/Shared/Cart/CartInfo";

function Checkout() {
  return (
    <section className={styles.section}>
      <h1>Checkout</h1>
      {/* content container */}
      <div className={styles.contentWrapper}>
        <div className={styles.formWrapper}>
          <h2>Order details</h2>
          <form>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Name"/>
              <input type="text" placeholder="Surname"/>
            </div>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email"/>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Address"/>
              <input type="text" placeholder="Zip Code"/>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
