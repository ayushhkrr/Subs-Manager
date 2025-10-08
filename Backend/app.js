import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import subsRoutes from "./routes/subsRoutes.js";

// import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors())
app.use('/api/users',userRoutes);
app.use('/api/subscription',subsRoutes);

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
