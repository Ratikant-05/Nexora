import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "UPI"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Checkout", CheckoutSchema);
