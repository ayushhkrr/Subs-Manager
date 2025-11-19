import { User, Subscription } from "../model/allSchemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const registerUser = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    // Validate required fields
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPswd = await bcrypt.hash(password, 10);
    const user = new User({
      fullName: fullName,
      username: username,
      email: email,
      password: hashPswd,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus || 'free',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Validate required fields
    if (!password || (!username && !email)) {
      return res.status(400).json({ error: "Username/email and password are required" });
    }

    const userLogin = await User.findOne({ $or: [{ username }, { email }] });

    if (!userLogin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userLogin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: userLogin._id,
        username: userLogin.username,
        fullName: userLogin.fullName,
        email: userLogin.email,
        subscriptionStatus: userLogin.subscriptionStatus || 'free',
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check authorization
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    const deleteUser = await User.findByIdAndDelete(req.params.id);
    const allSubDelete = await Subscription.deleteMany({
      userId: deleteUser._id,
    });
    const subText =
      allSubDelete.deletedCount === 0 || allSubDelete.deletedCount === 1
        ? "subscription"
        : "subscriptions";
    res.status(200).json({
      message: `User ${deleteUser.username} and all their ${allSubDelete.deletedCount} ${subText} have been deleted successfully`
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus || 'free',
      }
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const stripePaywall = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });
      user.stripeCustomerId = customer.id;
      stripeCustomerId = customer.id;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });
    res.status(200).json({ url: session.url, message: "Checkout session created successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Server error" });
  }
};
