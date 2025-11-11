import { User, Subscription } from "../model/allSchemas.js";
import mongoose from 'mongoose'

export const getSubscription = async (req, res) => {
  try {
    const subDetails = await Subscription.find({
      userId: req.user.id,
    });
    res.status(200).json(subDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postSubscription = async (req, res) => {
  try {
    const { plan, price, renewalDate } = req.body;

    // Validate required fields first
    if (!plan || !price || !renewalDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    // Validate renewalDate is a valid date
    const renewalDateObj = new Date(renewalDate);
    if (isNaN(renewalDateObj.getTime())) {
      return res.status(400).json({ error: "Invalid renewal date format" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newSubscription = new Subscription({
      userName: user.username,
      plan: plan,
      price: price,
      renewalDate: renewalDate,
      userId: req.user.id,
    });

    await newSubscription.save();
    res.status(201).json({ message: "Subscription added successfully", subscription: newSubscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid subscription ID" });
    }

    const userData = await Subscription.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Check authorization
    if (userData.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const updateData = req.body;

    // Validate price if it's being updated
    if (updateData.price !== undefined) {
      if (isNaN(updateData.price) || updateData.price <= 0) {
        return res.status(400).json({ error: "Price must be a positive number" });
      }
    }

    // Validate renewalDate if it's being updated
    if (updateData.renewalDate !== undefined) {
      const renewalDateObj = new Date(updateData.renewalDate);
      if (isNaN(renewalDateObj.getTime())) {
        return res.status(400).json({ error: "Invalid renewal date format" });
      }
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json({ message: "Subscription updated successfully", subscription: updatedSubscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid subscription ID" });
    }

    const userSubscription = await Subscription.findById(req.params.id);
    if (!userSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Check authorization
    if (userSubscription.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    const subDelete = await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Subscription ${subDelete.plan} successfully deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const subsDashboard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const summary = await Subscription.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalMonthlyCost: { $sum: '$price' },
          totalSubscription: { $sum: 1 },
          planNames: { $push: '$plan' }
        }
      }
    ]);

    if (summary.length > 0) {
      res.status(200).json(summary[0]);
    } else {
      res.status(200).json({ totalMonthlyCost: 0, totalSubscription: 0, planNames: [] });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};