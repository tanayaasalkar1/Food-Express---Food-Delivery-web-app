import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.token; // Token from headers

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // Debug logs (optional)
    console.log("Authenticated User ID:", req.userId);

    next();
  } catch (error) {
    console.error(" JWT Error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
