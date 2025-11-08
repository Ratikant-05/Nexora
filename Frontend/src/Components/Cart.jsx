import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = ({ refresh }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const BaseAPI = "https://nexora-tvn9.onrender.com || http://localhost:4444/api";

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BaseAPI}/getCart`);
      setCartItems(response.data.items || []);
      setTotal(response.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseAPI}/deleteItem/${id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${BaseAPI}/checkout`);
      toast.success(`Checkout successful!\nTotal: ₹${response.data.receipt.total}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (cartItems.length === 0)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#777",
          background: "#f9fafb",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        🛒 Your cart is empty
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "30px auto",
      }}
    >
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            marginBottom: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f3f5")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
        >
          <div>
            <strong style={{ fontSize: "16px", color: "#222" }}>
              {item.name}
            </strong>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Qty: {item.qty} × ₹{item.price}
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "bold", color: "#000" }}>
              ₹{item.price * item.qty}
            </p>
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                backgroundColor: "#ff5c5c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: "13px",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e63946")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff5c5c")}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <hr style={{ margin: "20px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0, color: "#111" }}>Total:</h3>
        <h3 style={{ margin: 0, color: "#27ae60" }}>₹{total}</h3>
      </div>

      <button
        onClick={handleCheckout}
        style={{
          width: "100%",
          backgroundColor: "#27ae60",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "12px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#219150")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
