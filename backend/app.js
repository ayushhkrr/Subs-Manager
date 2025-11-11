import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import subsRoutes from "./routes/subsRoutes.js";
import { startReminder } from './jobs/reminderJob.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet()); // Adds security headers

// CORS Configuration - restrict to specific origin in production
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting - prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many authentication attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Body parser middleware
app.use(express.json());

// Apply rate limiting to auth routes
app.use('/api/users/register', authLimiter);
app.use('/api/users/login', authLimiter);
app.use('/api', generalLimiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectdb();
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
  // Start reminder job after server is up
  startReminder();
};

startServer();
