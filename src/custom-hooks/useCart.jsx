import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useCart() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.redseam.redberryinternship.ge/api/cart",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async ({ productId, color, size, quantity }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
        { color, size, quantity },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async ({ productId, quantity, color, size }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
        {
          quantity,
          color,
          size,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async ({ productId, color, size }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { color, size },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getCartItems,
    addToCart,
    updateCart,
    deleteFromCart,
    loading,
    error,
  };
}

export default useCart;
