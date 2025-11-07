import React, { useState } from "react";
import axios from "axios";

const AddToCart = ({ productId, productName, productPrice, onAdded }) => {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BaseAPI = "http://localhost:4444/api";

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BaseAPI}/cart`, {
        productId,
        qty,
      });
      console.log(response.data);
      setError(null);

      // Optional: callback to refresh cart in parent component
      if (onAdded) onAdded();

      alert(`Added ${qty} x ${productName} to cart!`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <label>
        Qty:{" "}
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: "50px" }}
        />
      </label>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        style={{
          marginLeft: "10px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddToCart;
