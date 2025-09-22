import React, { useEffect, useState } from "react";
import filtersIcon from "../../assets/filters-icon.png";
import useProducts from "../../custom-hooks/useProducts";
import styles from "./Home.module.css";
import ProductControls from "../../components/ProductControls/ProductControls";

function Home() {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useProducts({ page });
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  return (
    <section className={styles.productsSection}>
      <div className={styles.productsHeader}>
        <h1>Products</h1>
        <div className={styles.userControlsContainer}>
          <p>
            Showing{" "}
            <span>
              {data?.meta?.from} - {data?.meta?.to}
            </span>{" "}
            of <span>{data?.meta?.total}</span> results
          </p>
          <button>
            <img src={filtersIcon} alt="Filters option icon" />
            Filter
          </button>
          <select name="sorting" id="sorting">
            {/* handle values once you'll move onto sorting functionality */}
            <option value="">Sort by</option>
            <option value="">New products first</option>
            <option value="">Price, low to high</option>
            <option value="">Price, high to low</option>
          </select>
        </div>
      </div>
      <div className={styles.productsContainer}>
        {data?.data?.map(({ id, cover_image, name, description, price }) => (
          <button key={id}>
              <img src={cover_image} alt={description} />

            <div className={styles.productInformation}>
              {name}
              <p>$ {price}</p>
            </div>
          </button>
        ))}
      </div>
      <ProductControls data={data} setPage={setPage} activePage={page}/>
    </section>
  );
}

export default Home;
