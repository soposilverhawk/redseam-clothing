import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../custom-hooks/useProducts";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const { data: product, loading, error } = useProducts({ id });
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedSize, setSelectedSize] = useState(product?.size);
  const selectableQuantities = Array.from({length: 10}, (_, i) => i + 1)

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  console.log(product);
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
              >
                <img src={img} alt={product.description} />
              </button>
            ))}
          </div>
          <div className={styles.activeStyle}>
            <img src={product?.cover_image} alt={product?.description} />
          </div>
        </div>
        <div className={styles.productDetailsAndOptionsContainer}>
          <div className={styles.productDetails}>
            <h1>{product?.name}</h1>
            <p>$ {product?.price}</p>
          </div>
          <form>
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
                      onChange={(e) => handleColorChange(e)}
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
                    className={styles.sizeButton}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.formOptionsWrapper}>
              <p>Quantity</p>
              <select name="quantity" id="product-quantity" className={styles.qtySelect}>
                {selectableQuantities.map((value) => (
                  <option key={`quantitiy-option-${value}`} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
