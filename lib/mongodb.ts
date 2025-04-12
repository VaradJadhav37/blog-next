// lib/mongodb.ts
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to database");
  }
};

export { connectToDatabase };  // Named export
