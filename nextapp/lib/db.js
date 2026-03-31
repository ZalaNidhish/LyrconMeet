import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Mongoose Already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo connected ✅");
  } catch (err) {
    console.log("Mongo error ❌", err);
  }
};