import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { useAuth } from "../../context/AuthContext";
import useCart from "../../custom-hooks/useCart";
import CartItemList from "../../components/Shared/Cart/CartItemList";
import ActionBtn from "../../components/Shared/ActionBtn/ActionBtn";
import PurchaseConfirmationModal from "../../components/purchaseConfirmationModal/PurchaseConfirmationModal";
import axios from "axios";

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
  const [isOrderDetailsSubmitted, setIsOrderDetailsSubmitted] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
  const submitOrderDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", orderDetails.name);
    formData.append("surname", orderDetails.surname);
    formData.append("email", orderDetails.email);
    formData.append("zip_code", orderDetails.zip_code);
    formData.append("address", orderDetails.address);

    try {
      const response = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/cart/checkout",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems([])

      setOrderDetails({
        name: "",
        surname: "",
        email: user?.email || "",
        address: "",
        zip_code: "",
      });
      
      if (response.status === 200) {
        setIsOrderDetailsSubmitted(true);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <section className={styles.section}>
      {isOrderDetailsSubmitted && isSuccessModalOpen && (
        <>
        <div className="overlay"></div>
        <PurchaseConfirmationModal setIsSuccessModalOpen={setIsSuccessModalOpen}/>
        </>
      )}
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
          <ActionBtn
            size="large"
            width="100%"
            handleClick={(e) => submitOrderDetails(e)}
          >
            Pay
          </ActionBtn>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
