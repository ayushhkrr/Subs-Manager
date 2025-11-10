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

    if (!plan || !price || !renewalDate) {
  return res.status(400).json("All fields are required");
}

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
    if(!userData){
      return res.status(404).json('Subscription not found')
    }
    if (userData.userId.toString() === req.user.id) {
      const updateData = req.body;
      const user = await Subscription.findByIdAndUpdate(
        req.params.id,
        updateData,
        {new: true}
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
    if(!userSubscription){
      return res.status(404).json('Subscription not found')
    }
    if (userSubscription.userId.toString() === req.user.id) {
      const subDelete = await Subscription.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json(`Subscription ${subDelete.plan} succesfully deleted`);
    } else {
      res.status(401).json("Unauthorized request");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
};

export const subsDashboard = async(req, res)=>{
  try{
    const userId = new mongoose.Types.ObjectId(req.user.id)
    const summary = await Subscription.aggregate([
      {$match: {userId}},

      {$group: {
        _id: null,
        totalMonthlyCost: {$sum: '$price'},
        totalSubscription: {$sum: 1},
        planNames: {$push: '$plan'}
      }}
    ])
    if(summary.length> 0){
      res.status(200).json(summary[0])
    }else{
      res.status(200).json({totalMonthlyCost: 0, totalSubscription: 0, planNames: []})
    }
  }catch(e){
    console.error(e)
    res.status(500).json('Server Error')
  }
}