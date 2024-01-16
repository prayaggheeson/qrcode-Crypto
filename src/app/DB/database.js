import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prayaggheeson:gheeson@cluster0.cdtqmza.mongodb.net/",
      { dbName: "mlm-app", autoCreate: true }
    );
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }
};
