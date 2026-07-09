import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://sharifkhaqan5_db_user:ghUCkYlC7yVTDpak@ac-yr1p0nn-shard-00-00.geeoefp.mongodb.net:27017,ac-yr1p0nn-shard-00-01.geeoefp.mongodb.net:27017,ac-yr1p0nn-shard-00-02.geeoefp.mongodb.net:27017/?ssl=true&replicaSet=atlas-rf1br5-shard-0&authSource=admin&appName=Cluster0");

        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};