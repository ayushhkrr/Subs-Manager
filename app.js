import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from './routes/userRoutes.js'


dotenv.config();

const app = express();
app.use(express.json());
app.use(routes)

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

