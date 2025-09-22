import React, { useState, useEffect } from "react";
import axios from "axios";

function useProducts({
  page = 1,
  priceFrom = null,
  priceTo = null,
  sortBy = null,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const params = { page };
        if (priceFrom !== null) params["filter[price_from]"] = priceFrom;
        if (priceTo !== null) params["filter[price_to"] = priceTo;
        if (sortBy) params.sort = sortBy;

        const response = await axios.get(
          "https://api.redseam.redberryinternship.ge/api/products",
          {
            params,
            cancelToken: source.token,
          }
        );

        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      source.cancel("Operation canceled due to new request.");
    };
  }, [page, priceFrom, priceTo, sortBy]);

  return { data, loading, error };
}

export default useProducts;
