import React, { useEffect, useState } from "react";
import closeIcon from "../../../assets/cart-close-icon.png";
import emptyCartIcon from "../../../assets/shopping-cart-orange.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import styles from "./CartInfo.module.css";
import ROUTES from "../../../routes/Routes";
import { useNavigate } from "react-router-dom";
import useCart from "../../../custom-hooks/useCart";

function CartInfo({ isOpen, setIsCartOpen }) {
  const navigate = useNavigate();
  const { getCartItems, loading, error } = useCart();
  const [cartItems, setCartItems] = useState([]);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const redirectToProducts = () => {
    navigate(ROUTES.HOME);
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      getCartItems()
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Failed to fetch cart:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <h3>
          Shopping cart (<span>{cartItems.length}</span>)
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
          {!loading && cartItems.length === 0 && (
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
                            $ {item.total_price}
                          </p>
                        </div>
                        {/* item controls */}
                        <div className={styles.itemControlsContainer}>
                          {/* quantity buttons */}
                          <div className={styles.qtyButtonsContainer}>
                            <button>-</button>
                            <span>{item.quantity}</span>
                            <button>+</button>
                          </div>
                          {/* item removal button */}
                          <button className={styles.removeButton}>
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
                  <span>$ {}</span>
                </div>
                <div className={styles.summaryInformationContainer}>
                  <p>Delivery</p>
                  <span>$ 5</span>
                </div>
                <div className={styles.summaryInformationContainer}>
                  <p>Total</p>
                  <span>$ {}</span>
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
