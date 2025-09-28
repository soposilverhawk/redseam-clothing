import React, { useEffect, useState } from "react";
import closeIcon from "../../../assets/cart-close-icon.png";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import styles from "./CartInfo.module.css";
import ROUTES from "../../../routes/Routes";
import { useNavigate } from "react-router-dom";
import useCart from "../../../custom-hooks/useCart";
import { useAuth } from "../../../context/AuthContext";

function CartInfo({ isOpen, setIsCartOpen }) {
  // handle case when quantity reaches 0 - the item should get removed from the cart
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

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const calculateCartItemsTotalPrice = () => {
    return cartItems.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0);
  };

  const calculateToTalItems = () => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const removeItem = (id) => {
    deleteFromCart({ productId: id })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Failed to remove item:", err));
  };

 const updateItemQty = (id, qty) => {
    updateCart({ productId: id, quantity: qty })
      .then(() => {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update item quantity:", err);
      });
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
      {loading && <p>Loading your cart...</p>}
      {error && <p className="error">{error}</p>}

      {isOpen && (
        <div className={styles.sidebarContentWrapper}>
          {(!loading && cartItems.length === 0 || !token) && (
            <div className={styles.emptyCartMsgContainer}>
              <img src={emptyCartIcon} alt="empty cart icon" />
              <h4>Ooops!</h4>
              <p>You've got nothing in your cart just yet...</p>
              <ActionBtn size="small" handleClick={redirectToProducts}>
                Start shopping
              </ActionBtn>
            </div>
          )}

          {!loading && cartItems.length > 0 && (
            <>
              <ul className={styles.cartList}>
                {cartItems.map((item, idx) => {
                  // Find the index of the selected color
                  const colorIndex = item.available_colors.indexOf(item.color);

                  // Get the corresponding image
                  const imageForColor =
                    colorIndex >= 0
                      ? item.images[colorIndex]
                      : item.cover_image;

                  return (
                    <li key={`cart-item-${idx + 1}`}>
                      <img
                        src={imageForColor}
                        alt={`${item.name} in ${item.color}`}
                      />
                      <div className={styles.itemInfoWrapper}>
                        {/* item info */}
                        <div className={styles.itemInfoContainer}>
                          <div>
                            <p className={styles.itemName}>{item.name}</p>
                            <p>{item.color}</p>
                            <p>{item.size}</p>
                          </div>
                          <p className={styles.itemTotalPrice}>
                            $ {Number(item.price) * Number(item.quantity)}
                          </p>
                        </div>
                        {/* item controls */}
                        <div className={styles.itemControlsContainer}>
                          {/* quantity buttons */}
                          <div className={styles.qtyButtonsContainer}>
                            <button
                              onClick={() =>
                                updateItemQty(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateItemQty(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          {/* item removal button */}
                          <button
                            className={styles.removeButton}
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.cartSummaryContainer}>
                <div className={styles.summaryInformationContainer}>
                  <p>Items subtotal</p>
                  <span>$ {calculateCartItemsTotalPrice()}</span>
                </div>
                <div className={styles.summaryInformationContainer}>
                  <p>Delivery</p>
                  <span>$ {deliveryFee}</span>
                </div>
                <div className={styles.summaryInformationContainer}>
                  <p>Total</p>
                  <span>$ {calculateCartItemsTotalPrice() + deliveryFee}</span>
                </div>
                <ActionBtn size="large">Go to checkout</ActionBtn>
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}

export default CartInfo;
