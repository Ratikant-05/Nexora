import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BaseAPI = "http://localhost:4444/api";

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseAPI}/getCart`);
      setCart(response.data.items);
      setTotal(response.data.total);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseAPI}//deleteItem/${id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${BaseAPI}/checkout`);
      alert(`Checkout successful!\nTotal: ₹${response.data.receipt.total}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed!");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default GetCart;
