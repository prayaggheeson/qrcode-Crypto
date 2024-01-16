// userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  referralCode: { type: String, unique: true },
  referralCount: { type: Number, default: 0 },
  referralIncome: { type: Number, default: 0 },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
