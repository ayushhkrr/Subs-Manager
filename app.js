import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
app.use(express.json());

const app = express();
const PORT = process.env.PORT || 5000;
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Succesfully connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
const startServer = async () => {
  await connectdb();
  app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
  });
};
startServer();

