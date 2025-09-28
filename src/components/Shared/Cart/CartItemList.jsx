import React from "react";
import styles from "./CartInfo.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";

function CartItemList({
  cartItems,
  loading,
  deliveryFee,
  updateItemQty,
  removeItem,
  goToCheckout, // for sidebar
}) {
  const calculateCartItemsTotalPrice = () => {
    return cartItems.reduce(
      (acc, curr) => acc + Number(curr.price) * Number(curr.quantity),
      0
    );
  };

  if (loading) return <p>Loading your cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <>
      <ul className={styles.cartList}>
        {cartItems.map((item, idx) => {
          const colorIndex = item.available_colors.indexOf(item.color);
          const imageForColor =
            colorIndex >= 0 ? item.images[colorIndex] : item.cover_image;

          return (
            <li key={`cart-item-${idx}`}>
              <img src={imageForColor} alt={`${item.name} in ${item.color}`} />
              <div className={styles.itemInfoWrapper}>
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
                <div className={styles.itemControlsContainer}>
                  <div className={styles.qtyButtonsContainer}>
                    <button
                      onClick={() =>
                        updateItemQty(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateItemQty(
                          item.id,
                          item.color,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id, item.color, item.size)}
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
        {goToCheckout && (
          <ActionBtn size="large" handleClick={goToCheckout}>
            Go to checkout
          </ActionBtn>
        )}
      </div>
    </>
  );
}

export default CartItemList;
