import mongoose from "mongoose";

const connectDB = () => {
  try {
    const db = mongoose.connect(process.env.URI_MONGODB);
    console.log("Successfully connecting to MongoDB");
    return db;
  } catch (err) {
    throw new Error(err.toString());
  }
};

export default connectDB;
