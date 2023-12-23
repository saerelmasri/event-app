import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

    console.log("Connecting to MongoDB...");

    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        dbName: "eventDB",
        bufferCommands: false,
      });

    cached.conn = await cached.promise;

    console.log("Connected to MongoDB!");

    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw the error to let the calling code handle it
  }
};
