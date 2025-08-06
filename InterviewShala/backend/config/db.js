import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://vaibhaw:vaibhaw@cluster0.q4txadr.mongodb.net/vaibhaw?retryWrites=true&w=majority';
    await mongoose.connect(mongoURI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error}`);
    console.log("Database connection error");
    process.exit(1);
  }
};

export default connectDB;
