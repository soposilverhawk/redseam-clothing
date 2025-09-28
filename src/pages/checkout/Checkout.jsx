import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { useAuth } from "../../context/AuthContext";
import useCart from "../../custom-hooks/useCart";
import CartItemList from "../../components/Shared/Cart/CartItemList";
import ActionBtn from "../../components/Shared/ActionBtn/ActionBtn";

function Checkout() {
  const { user, token } = useAuth();
  const { getCartItems, deleteFromCart, updateCart, loading, error } =
    useCart();
  const [cartItems, setCartItems] = useState([]);
  const deliveryFee = 5;
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    surname: "",
    email: user?.email || "",
    address: "",
    zip_code: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!token) return;

    getCartItems()
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [token]);

  const removeItem = (id, color, size) => {
    deleteFromCart({ productId: id, color, size })
      .then(() => {
        setCartItems((prev) =>
          prev.filter(
            (item) =>
              !(item.id === id && item.color === color && item.size === size)
          )
        );
      })
      .catch((err) => console.error("Failed to remove item:", err));
  };

  const updateItemQty = (id, color, size, qty) => {
    if (qty <= 0) {
      removeItem(id, color, size);
      return;
    }
    updateCart({ productId: id, color, size, quantity: qty })
      .then(() => {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id && item.color === color && item.size === size
              ? { ...item, quantity: qty }
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update item quantity:", err);
      });
  };
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
        <div className={styles.cartInfoContainer}>
          <div className={styles.cartListWrapper}>
            <CartItemList
            cartItems={cartItems}
            loading={loading}
            deliveryFee={deliveryFee}
            updateItemQty={updateItemQty}
            removeItem={removeItem}
          />
          </div>
          <ActionBtn size="large" width="100%">Pay</ActionBtn>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
