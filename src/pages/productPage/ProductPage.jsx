import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../custom-hooks/useProducts";
import ActionBtn from "../../components/Shared/ActionBtn/ActionBtn";
import styles from "./ProductPage.module.css";
import useCart from "../../custom-hooks/useCart";
import { useAuth } from "../../context/AuthContext";

function ProductPage() {
  // handle loading and error logic
  // handle form functionality
  const { id } = useParams();
  const { data: product, loading, error } = useProducts({ id });
  const {addToCart, loading: cartLoading, error: cartError} = useCart();
  const {token} = useAuth();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const selectableQuantities = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    if (product) {
      const defaultColor = product.available_colors[0] || "";
      setSelectedColor(defaultColor);
      setActiveImage(product.images[0] || "");
      setSelectedSize(product.available_sizes[0] || "");
    }
  }, [product]);

  const handleColorChange = (color, idx) => {
    setSelectedColor(color);
    setActiveImage(product.images[idx]);
  };
  const handleVariationChangeClick = (idx) => {
    setActiveImage(product.images[idx]);
    setSelectedColor(product.available_colors[idx]);
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleQtyChange = (event) => {
    setSelectedQty(Number(event.target.value))
  }

  const handleAddToCart = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("You need to log in to add products to your cart!");
      return
    }

    try {
      await addToCart({
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQty,
      })
    } catch (err) {
      alert("Failed to add to cart. Please try again.")
    }
  }

  return (
    <section className={styles.section}>
      <div>
        <p>Listing/product</p>
      </div>
      <div className={styles.productInformationContainer}>
        <div className={styles.productVariationsContainer}>
          <div className={styles.productStyles}>
            {product?.images.map((img, idx) => (
              <button
                key={`product-variant-${idx + 1}`}
                className={styles.variationStylesSelect}
                aria-label={`Select variant ${idx + 1}`}
                onClick={() => handleVariationChangeClick(idx)}
              >
                <img src={img} alt={product.description} />
              </button>
            ))}
          </div>
          <div className={styles.activeStyle}>
            <img src={activeImage} alt={product?.description} />
          </div>
        </div>
        <div className={styles.productDetailsAndOptionsContainer}>
          <div className={styles.productDetails}>
            <h1>{product?.name}</h1>
            <p>$ {product?.price}</p>
          </div>
          <form onSubmit={(e) => handleAddToCart(e)}>
            <div className={styles.formOptionsWrapper}>
              <p>Color: {selectedColor}</p>
              {/* available colors container */}
              <div className={styles.customizationOptionsContainer}>
                {product?.available_colors.map((color, idx) => (
                  <label
                    key={`available-color-${idx + 1}`}
                    className={styles.colorLabel}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      onChange={(e) => handleColorChange(color, idx)}
                      checked={selectedColor === color}
                      style={{ display: "none" }} // hide native radio
                    />
                    <span
                      className={styles.colorCircle}
                      style={{
                        backgroundColor: color, // make the circle the actual color
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.formOptionsWrapper}>
              <p>Size: {selectedSize}</p>
              {/* available sizes container */}
              <div className={styles.customizationOptionsContainer}>
                {product?.available_sizes.map((size, idx) => (
                  <button
                    key={`available-size-${idx + 1}`}
                    aria-label={`pick size ${size}`}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.activeSizeButton : ""
                    }`}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.formOptionsWrapper}>
              <p>Quantity</p>
              <select
                name="quantity"
                id="product-quantity"
                className={styles.qtySelect}
                onChange={(e) => handleQtyChange(e)}
              >
                {selectableQuantities.map((value) => (
                  <option key={`quantitiy-option-${value}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <ActionBtn variant="cartAction" size="large">
              Add to Cart
            </ActionBtn>
          </form>
          <div className={styles.productDescriptionContainer}>
            <div className={styles.brandLogoContainer}>
              <h2>Details</h2>
              <img
                src={product?.brand?.image}
                alt={`${product?.brand?.name} logo`}
              />
            </div>
            <div className={styles.productDescription}>
              <p>Brand: {product?.brand?.name}</p>
              <p>{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
