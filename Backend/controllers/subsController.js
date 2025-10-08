import { User, Subscription } from "../model/allSchemas.js";

export const getSubscription = async (req, res) => {
  try {
    const subDetails = await Subscription.find({
      userId: req.user.id,
    });
    const foundUser = await User.findById(req.user.id);
    if (foundUser.username === req.params.username) {
      res.status(200).json(subDetails);
    } else {
      res.status(401).json("User not authorized");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
};

export const postSubscription = async (req, res) => {
  try {
    const { plan, price, renewalDate } = req.body;
    const user = await User.findById(req.user.id);
    const newSubscription = new Subscription({
      userName: user.username,
      plan: plan,
      price: price,
      renewalDate: renewalDate,
      userId: req.user.id,
    });
    await newSubscription.save();
    res.status(201).json("Subscription Added Succesfully");
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const userData = await Subscription.findById(req.params.id);
    if (userData.userId.toString() === req.user.id) {
      const updateData = req.body;
      const user = await Subscription.findByIdAndUpdate(
        req.params.id,
        updateData
      );
      res.status(200).json("Subscription Updated");
    } else {
      res.status(401).json("unauthorized user");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const userSubscription = await Subscription.findById(req.params.id);
    if (userSubscription.userId.toString() === req.user.id) {
      const subDelete = await Subscription.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json(`Subscription ${subDelete.plan} succesfully deleted`);
    } else {
      res.status(404).json("Unauthorized request");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
};
