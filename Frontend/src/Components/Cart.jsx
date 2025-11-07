import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ refresh }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const BaseAPI = "http://localhost:4444/api";

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BaseAPI}/getCart`);
      setCartItems(response.data.items);
      setTotal(response.data.total);
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

  if (cartItems.length === 0) return <p>Cart is empty 🛒</p>;

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
      <h3>Your Cart</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} — ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4>Total: ₹{total}</h4>
    </div>
  );
};

export default Cart;
