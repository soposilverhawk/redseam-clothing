import React, { useState, useEffect } from "react";
import axios from "axios";

function useProducts({ id = null, page = 1, priceFrom = null, priceTo = null, sortBy = null }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (id) {
          // fetch single product by ID
          response = await axios.get(
            `https://api.redseam.redberryinternship.ge/api/products/${id}`,
            { cancelToken: source.token }
          );
        } else {
          // fetch product list
          const params = { page };
          if (priceFrom !== null && priceFrom !== "") params["filter[price_from]"] = priceFrom;
          if (priceTo !== null && priceTo !== "") params["filter[price_to]"] = priceTo;
          if (sortBy) params.sort = sortBy;

          response = await axios.get(
            "https://api.redseam.redberryinternship.ge/api/products",
            { params, cancelToken: source.token }
          );
        }

        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => source.cancel("Operation canceled due to new request.");
  }, [id, page, priceFrom, priceTo, sortBy]);

  return { data, loading, error };
}

export default useProducts;

