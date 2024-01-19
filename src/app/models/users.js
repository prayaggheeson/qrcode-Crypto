import mongoose from "mongoose";

let UserModel;

try {
  // Check if the model is already defined before defining it
  UserModel = mongoose.model("User");
} catch (e) {
  // Define the model only if it's not already defined
  const userSchema = new mongoose.Schema({
    walletAddress: { type: String, unique: true, required: true },
    referralCode: { type: String, unique: true, required: true },
    referralCount: { type: Number, default: 0 },
    referralIncome: { type: Number, default: 0 },
  });

  UserModel = mongoose.model("User", userSchema);
}

export default UserModel;
