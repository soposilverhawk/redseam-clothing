import React, { useEffect, useState } from "react";
import closeIcon from "../../../assets/cart-close-icon.png";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import styles from "./CartInfo.module.css";
import ROUTES from "../../../routes/Routes";
import { useNavigate } from "react-router-dom";
import useCart from "../../../custom-hooks/useCart";
import { useAuth } from "../../../context/AuthContext";
import CartItemList from "./CartItemList";
import EmptyCart from "./EmptyCart";

function CartInfo({ isOpen, setIsCartOpen }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { getCartItems, deleteFromCart, updateCart, loading, error } =
    useCart();
  const [cartItems, setCartItems] = useState([]);
  const deliveryFee = 5;

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const redirectToProducts = () => {
    navigate(ROUTES.HOME);
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (isOpen && token) {
      getCartItems()
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Failed to fetch cart:", err));
    }
  }, [isOpen, token]);

  const calculateToTalItems = () => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  };

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

  const goToCheckout = () => {
    setIsCartOpen(false);
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <h3>
          Shopping cart (<span>{calculateToTalItems()}</span>)
        </h3>
        <button aria-label="Close cart" onClick={closeCart}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className={styles.sidebarContentWrapper}>
          <EmptyCart
            loading={loading}
            cartItems={cartItems}
            clickEvent={redirectToProducts}
            token={token}
            variant="sidebar"
          />

          {!loading && cartItems.length > 0 && (
            <CartItemList
              cartItems={cartItems}
              loading={loading}
              deliveryFee={deliveryFee}
              updateItemQty={updateItemQty}
              removeItem={removeItem}
              goToCheckout={goToCheckout}
            />
          )}
        </div>
      )}
    </aside>
  );
}

export default CartInfo;
