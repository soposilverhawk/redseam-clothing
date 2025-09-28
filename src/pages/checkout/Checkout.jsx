import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useAuth } from "../../context/AuthContext";

function Checkout() {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    surname: "",
    email: user?.email || "",
    address: "",
    zip_code: "",
  });
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <section className={styles.section}>
      <h1>Checkout</h1>
      {/* content container */}
      <div className={styles.contentWrapper}>
        <div className={styles.formWrapper}>
          <h2>Order details</h2>
          <form>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={orderDetails.name}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="text"
                placeholder="Surname"
                name="surname"
                value={orderDetails.surname}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={orderDetails.email}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={orderDetails.address}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="text"
                placeholder="Zip Code"
                name="zip_code"
                value={orderDetails.zip_code}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
