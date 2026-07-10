import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("Current ReadyState:", mongoose.connection.readyState);

    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");
    console.log("New ReadyState:", mongoose.connection.readyState);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};