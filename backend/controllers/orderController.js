import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Place order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentStatus: "Pending",
      orderStatus: "Order Placed",
      tracking: [{ status: "Order Placed" }]
    });

    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Create Razorpay order
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
      notes: { orderId: newOrder._id.toString() }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: "Failed to place order" });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentStatus: "Paid",
        orderStatus: "Processing",
        $push: { tracking: { status: "Processing" } }
      });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Get user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

//Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}); //all orders data in orders variable
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:true, message:"Error"})
    
  }
}

//api for updating order status
const updateStatus = async (req, res) => {
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
      res.json({success:true, message:"status updated"})
    } catch (error) {
      res.json({success:false, message:"error"})
    }
}


export { placeOrder, verifyPayment, userOrders, listOrders, updateStatus };
