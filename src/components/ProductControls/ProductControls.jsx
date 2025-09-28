import React from "react";
import styles from "./ProductControls.module.css";
import prevControlIcon from "../../assets/chevron-left.png";
import nextControlIcon from "../../assets/chevron-right.png";

function ProductControls({ totalPages, setPage, activePage }) {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      // show all pages if small total
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // always show first 2
    pages.push(1, 2);

    // left ellipsis
    if (activePage > 4) {
      pages.push("...");

      
    }

    // middle pages: activePage -1, activePage, activePage +1
    const start = Math.max(3, activePage - 1);
    const end = Math.min(totalPages - 2, activePage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    // right ellipsis
    if (activePage < totalPages - 3) {
      pages.push("...");
    }

    // always show last 2
    pages.push(totalPages - 1, totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.productControlsContainer}>
      <button
        className={styles.controlIcon}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={activePage === 1}
      >
        <img src={prevControlIcon} alt="view previous arrow icon" />
      </button>

      {visiblePages.map((pageNum, idx) =>
        pageNum === "..." ? (
          <span key={`dots-${idx}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={`page-${pageNum}`}
            onClick={() => setPage(pageNum)}
            className={
              activePage === pageNum ? styles.currentPage : styles.button
            }
          >
            {pageNum}
          </button>
        )
      )}

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
