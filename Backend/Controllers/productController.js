import {v4 as uuidv4} from 'uuid'

let products = [
  { id: "1", name: "Wireless Headphones", price: 1499 },
  { id: "2", name: "Smart Watch", price: 2499 },
  { id: "3", name: "Bluetooth Speaker", price: 999 },
  { id: "4", name: "Laptop Stand", price: 799 },
  { id: "5", name: "Gaming Mouse", price: 1199 },
  { id: "6", name: "Mechanical Keyboard", price: 2999 },
  { id: "7", name: "USB-C Hub", price: 699 },
  { id: "8", name: "External SSD 1TB", price: 6499 },
  { id: "9", name: "Phone Tripod", price: 599 },
  { id: "10", name: "Noise Cancelling Mic", price: 1299 },
];

let cart = [];
let CheckoutHistory = [];

export const getAllProductsController = async (req, res) => {
  try {
    res.json(products);
    console.log(products);
  } catch (error) {
    res.json(error.message);
    console.log(error);
  }
};

export const AddToCartController = (req, res) => {
  const { productId, qty } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product){
    return res.status(404).json({
       message: "Product not found"
    });
  }

  const existingItem = cart.find((item) => item.productId === String(productId));

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: uuidv4(),
      productId,
      qty,
      name: product.name,
      price: product.price
    });
  }

  res.json({ message: "Item added to cart" });
};

export const getCartController = (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
};

export const deleteItemController = (req, res) => {
  const { id } = req.params;

  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  cart.splice(index, 1);
  res.json({ message: "Item removed successfully" });
};


export const checkoutController = (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty, nothing to checkout" });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const receipt = {
    id: uuidv4(),
    items: [...cart],
    total,
    timestamp: new Date().toISOString(),
  };

  CheckoutHistory.push(receipt);
  
  cart = [];

  res.status(200).json({
    message: "Checkout successful",
    receipt,
  });
};

