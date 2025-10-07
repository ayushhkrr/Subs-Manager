import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User, Subscription } from "../model/users.js";
import protect from '../middleware/auth.js'

const routes = express.Router();

routes.post("/register", async (req, res) => {
  try {
    const user = User(req.body);
    const password = req.body.password;
    const hashPswd = await bcrypt.hash(password, 10);
    user.password = hashPswd;
    await user.save();
    const token = jwt.sign({id: user._id,},process.env.SECRET_KEY, {expiresIn: '1h'})
    // res.status(201).json(`User Registered, ${token}`);
    res.status(201).json({
    message: 'User Registered',
    token: token,
    user: {
        id: user._id,
        username: user.username
    }
});
  } catch (err) {
    console.log(err);
    res.status(400).json("Bad request");
  }
});

routes.get("/subscriptions/:username", protect,async (req, res) => {
  try {
    const subDetails = await Subscription.find({
      userName: req.params.username,
    });
    const foundUser = await User.findById(req.user.id)
    if(foundUser.username === req.params.username){

      res.status(200).json(subDetails);
    }else{
      res.status(401).json('User not authorized')
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
});

routes.post('/subscriptions', protect, async(req, res)=>{
      try{
        const {plan, price, renewalDate} = req.body
        const user = await User.findById(req.user.id)
        const newSubscription = new Subscription({
          userName: user.username,
          plan: plan,
          price: price,
          renewalDate: renewalDate,
          userId: req.user.id
        })
        await newSubscription.save()
        res.status(201).json('Subscription Added Succesfully')
      }catch(err){
        console.error(err)
        res.status(400).json('Bad request')
      }
})

routes.patch('/subscriptions/:id',protect, async(req, res)=>{
  try{
        const userData = await Subscription.findById(req.params.id)
        if (userData.userId.toString() === req.user.id){
          const updateData = req.body
        const user = await Subscription.findByIdAndUpdate(req.params.id, updateData)
        res.status(200).json('Subscription Updated')
        }else{
          res.status(401).json('unauthorized user')
        }
        
  }catch(err){
    console.error(err)
    res.status(400).json('Bad request')
  }
})

routes.delete('/subscriptions/:id',protect,async(req, res)=>{
      try{
        const userSubscription = await Subscription.findById(req.params.id)
        if(userSubscription.userId.toString() === req.user.id){
          const subDelete = await Subscription.findByIdAndDelete(req.params.id)
          res.status(200).json(`Subscription ${subDelete.plan} succesfully deleted`)
        }else{
          res.status(404).json('Unauthorized request')
        }
      }catch(err){
        console.error(err)
        res.status(400).json('Bad request')
      }
})

routes.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userLogin = await User.findOne({ $or: [{ username }, { email }] });

    if (userLogin) {
      if (await bcrypt.compare(password, userLogin.password)) {
        const token= jwt.sign({id: userLogin._id}, process.env.SECRET_KEY)
        // res.status(200).json({message: 'User logged in', token });
        res.status(200).json({
    message: 'User logged in',
    token: token,
    user: {
        id: userLogin._id,
        username: userLogin.username
    }
});
      } else {
        res.status(404).json("User data not found");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json("Bad request");
  }
});

routes.delete('/deleteUser/:id', protect, async(req, res)=>{
  try{
      const user = await User.findById(req.params.id)
      if(user._id.toString() === req.user.id){
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        const allSubDelete = await Subscription.deleteMany({userId: deleteUser._id})
        const subText =allSubDelete.deletedCount === 0 || allSubDelete.deletedCount === 1 ? 'subscription' : 'subscriptions'
        res.status(200).json(`User ${deleteUser.username} and all their ${allSubDelete.deletedCount} ${subText} have been deleted`)
      }else{
        res.status(404).json('User not found')
      }
  }catch(e){
    console.error(e)
    res.status(400).json('Bad request')
  }
})

export default routes