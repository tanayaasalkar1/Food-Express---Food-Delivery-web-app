import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
  },
  { minimize: false }
);

// ✅ Use capitalized model name & handle multiple imports in dev
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
