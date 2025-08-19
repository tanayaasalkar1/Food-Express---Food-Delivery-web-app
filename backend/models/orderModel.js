// Model to save the order in database
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },

    // Payment and order tracking fields
    payment: { type: Boolean, default: false },
    paymentStatus: { type: String, default: "Paid" }, // Pending, Paid, Failed
    status: { type: String, default: "Order Placed" }, // Order Placed, Processing, Shipped, Delivered, Cancelled

    // Tracking steps
    tracking: [
      {
        status: { type: String, required: true },
        date: { type: Date, default: Date.now }
      }
    ],

    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
