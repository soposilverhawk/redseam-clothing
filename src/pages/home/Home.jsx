import React, { useEffect, useState, useMemo } from "react";
import filtersIcon from "../../assets/filters-icon.png";
import useProducts from "../../custom-hooks/useProducts";
import styles from "./Home.module.css";
import ProductControls from "../../components/ProductControls/ProductControls";
import ActionBtn from "../../components/Shared/ActionBtn/ActionBtn";
import removeIcon from "../../assets/close-icon.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/Routes";

function Home() {
  // handle edge case of user selecting only one filter instead of range
  // handle loading and error logics for data
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    priceFrom: "",
    priceTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceFrom: null,
    priceTo: null,
  });
  const [sortBy, setSortBy] = useState("");

  const { data, loading, error } = useProducts({
    page,
    priceFrom: appliedFilters.priceFrom,
    priceTo: appliedFilters.priceTo,
    sortBy,
  });

  // Calculate total pages from backend metadata
  const totalPages = useMemo(() => {
    if (!data?.meta) return 1;
    const perPage =
      data.meta.per_page ?? data.meta.perPage ?? data.data?.length ?? 10;
    return Math.max(1, Math.ceil((data.meta.total ?? 0) / perPage));
  }, [data?.meta?.total, data?.meta?.per_page, data?.data?.length]);

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFiltersInput((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleFiltersSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filtersInput);
    setPage(1); // reset to first page when filters change
    setShowFilters(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1); // reset to first page when sorting changes
  };

  const removeFilters = () => {
    setFiltersInput({
      priceFrom: "",
      priceTo: ""
    })
    setAppliedFilters({
      priceFrom: null,
      priceTo: null
    })
  }

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
            <form onSubmit={handleFiltersSubmit}>
              <div className={styles.inputsGroupping}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="priceFrom"
                    placeholder=""
                    value={filtersInput.priceFrom}
                    onChange={handleFiltersChange}
                  />
                  <span className={styles.placeholder}>
                    From <span className={styles.required}>*</span>
                  </span>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder=""
                    name="priceTo"
                    value={filtersInput.priceTo}
                    onChange={handleFiltersChange}
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
        <div className={styles.productsAdditionalInfoContainer}>
          <h1>Products</h1>
          {(appliedFilters.priceFrom !== null || appliedFilters.priceTo !== null) && (
            <div>
              Price {appliedFilters.priceFrom ?? ""} - {appliedFilters.priceTo ?? ""}
              <button aria-label="Remove price filter" onClick={removeFilters}>
                <img src={removeIcon} alt="" />
              </button>
            </div>
          )}
        </div>
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
            <option value="">Sort by</option>
            <option value="created_at">New products first</option>
            <option value="price">Price, low to high</option>
            <option value="-price">Price, high to low</option>
          </select>
        </div>
      </div>

      <div className={styles.productsContainer}>
        {data?.data?.map(({ id, cover_image, name, description, price }) => (
          <button key={id} onClick={() => navigate(ROUTES.PRODUCTPAGE.replace(":id", id))}>
            <img src={cover_image} alt={description} />
            <div className={styles.productInformation}>
              {name}
              <p>$ {price}</p>
            </div>
          </button>
        ))}
      </div>

      <ProductControls
        totalPages={totalPages}
        setPage={setPage}
        activePage={page}
      />
    </section>
  );
}

export default Home;
