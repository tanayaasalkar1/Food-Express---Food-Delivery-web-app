import userModel from '../models/userModel.js';

//  Add item to cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    const cartData = userData.cartData || {};
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    return res.json({ success: true, message: " Added to cart", cartData });
  } catch (error) {
    console.error(" Add to cart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
const removefromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    const cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    return res.json({ success: true, message: "Removed from cart", cartData });
  } catch (error) {
    console.error(" Remove from cart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//  Fetch user cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    const cartData = userData.cartData || {};
    return res.json({ success: true, message: " Cart data fetched successfully", cartData });
  } catch (error) {
    console.error(" Get cart error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, removefromCart, getCart };
