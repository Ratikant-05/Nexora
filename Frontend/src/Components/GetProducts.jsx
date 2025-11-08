import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import { toast } from "react-toastify";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false);

  const BaseAPI = "https://nexora-tvn9.onrender.com || http://localhost:4444/api";

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
      toast.success("Product added to cart!");
      setCartUpdated(!cartUpdated);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add to cart");
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p>⏳ Loading products...</p>
      </div>
    );

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
    );

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "30px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <div style={{ flex: 3 }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333",
            fontSize: "24px",
          }}
        >
          Available Products
        </h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h3 style={{ fontSize: "16px", color: "#333" }}>
                  {product.name}
                </h3>
                <p
                  style={{
                    color: "#2ecc71",
                    fontWeight: "bold",
                    margin: "8px 0",
                  }}
                >
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#2176bd")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#3498db")
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          height: "fit-content",
          margin: "70px 0px"
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: "#333",
            fontSize: "20px",
          }}
        >
          Your Cart
        </h3>
        <Cart refresh={cartUpdated} />
      </div>
    </div>
  );
};

export default GetProducts;
