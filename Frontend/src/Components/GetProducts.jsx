import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [cartUpdated, setCartUpdated] = useState(false);

  const BaseAPI = "http://localhost:4444/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseAPI}/products`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`${BaseAPI}/cart`, { productId, qty: 1 });
      setMessage("Product added to cart!");
      setCartUpdated(!cartUpdated);

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to add to cart");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <div style={{ flex: 2 }}>
        <h2>Available Products</h2>

        {message && <p style={{ color: message ? "green" : "red" }}>{message}</p>}

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  marginBottom: "15px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <strong>{product.name}</strong> — ₹{product.price}
                <button
                  onClick={() => handleAddToCart(product.id)}
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
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <Cart refresh={cartUpdated} />
      </div>
    </div>
  );
};

export default GetProducts;
