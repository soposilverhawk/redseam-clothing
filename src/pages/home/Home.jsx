import React, { useEffect, useState } from "react";
import filtersIcon from "../../assets/filters-icon.png";
import useProducts from "../../custom-hooks/useProducts";
import styles from "./Home.module.css";
import ProductControls from "../../components/ProductControls/ProductControls";
import ActionBtn from "../../components/Shared/ActionBtn/ActionBtn";

function Home() {
  // fix pagination visuals and issue when there are much less items than pages
  // fix the sort and filter to work together coherently
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    priceFrom: "",
    priceTo: ""
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceFrom: 100,
    priceTo: 500,
  });
  const [sortBy, setSortBy] = useState("");
  const { data, loading, error } = useProducts({
    page,
    priceFrom: appliedFilters.priceFrom,
    priceTo: appliedFilters.priceTo,
    sortBy
  });
  const filteredProducts = data?.data?.filter(
    (item) =>
      item.price >= appliedFilters.priceFrom &&
      item.price <= appliedFilters.priceTo
  );

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFiltersInput((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleFiltersSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filtersInput);
    setShowFilters(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  return (
    <section className={styles.productsSection}>
      <div className={styles.productsHeader}>
        {showFilters && (
          <div
            className={
              showFilters
                ? styles.filtersContainer
                : styles.filtersContainerInactive
            }
          >
            <p>Select price</p>
            <form action="" onSubmit={(e) => handleFiltersSubmit(e)}>
              <div className={styles.inputsGroupping}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    required
                    placeholder=""
                    name="priceFrom"
                    value={filtersInput.priceFrom}
                    onChange={(e) => handleFiltersChange(e)}
                  />
                  <span className={styles.placeholder}>
                    From <span className={styles.required}>*</span>
                  </span>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    required
                    placeholder=""
                    name="priceTo"
                    value={filtersInput.priceTo}
                    onChange={(e) => handleFiltersChange(e)}
                  />
                  <span className={styles.placeholder}>
                    To <span className={styles.required}>*</span>
                  </span>
                </div>
              </div>
              <ActionBtn size="small">Apply</ActionBtn>
            </form>
          </div>
        )}
        <h1>Products</h1>
        <div className={styles.userControlsContainer}>
          <p>
            Showing{" "}
            <span>
              {data?.meta?.from} - {data?.meta?.to}
            </span>{" "}
            of <span>{data?.meta?.total}</span> results
          </p>
          <button onClick={() => setShowFilters((prev) => !prev)}>
            <img src={filtersIcon} alt="Filters option icon" />
            Filter
          </button>
          <select name="sorting" id="sorting" onChange={handleSortChange}>
            {/* handle values once you'll move onto sorting functionality */}
            <option value="price">Sort by</option>
            <option value="created_at">New products first</option>
            <option value="price">Price, low to high</option>
            <option value="-price">Price, high to low</option>
          </select>
        </div>
      </div>
      <div className={styles.productsContainer}>
        {filteredProducts?.map(({ id, cover_image, name, description, price }) => (
          <button key={id}>
            <img src={cover_image} alt={description} />

            <div className={styles.productInformation}>
              {name}
              <p>$ {price}</p>
            </div>
          </button>
        ))}
      </div>
      <ProductControls data={data} setPage={setPage} activePage={page} />
    </section>
  );
}

export default Home;
