import React from "react";
import styles from "./ProductControls.module.css";
import prevControlIcon from "../../assets/chevron-left.png";
import nextControlIcon from "../../assets/chevron-right.png";

function ProductControls({ totalPages, setPage, activePage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.productControlsContainer}>
      <button
        className={styles.controlIcon}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={activePage === 1}
      >
        <img src={prevControlIcon} alt="view previous arrow icon" />
      </button>

      {pages.map((pageNum) => (
        <button
          key={`page-${pageNum}`}
          onClick={() => setPage(pageNum)}
          className={
            activePage === pageNum ? styles.currentPage : styles.button
          }
        >
          {pageNum}
        </button>
      ))}

      <button
        className={styles.controlIcon}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={activePage === totalPages}
      >
        <img src={nextControlIcon} alt="view next arrow icon" />
      </button>
    </div>
  );
}

export default ProductControls;
