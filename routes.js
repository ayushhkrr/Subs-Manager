import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User, Subscription } from "./model/users.js";
import protect from './middleware/auth.js'
const routes = express.Router();

routes.post("/register", async (req, res) => {
  try {
    const user = User(req.body);
    const password = req.body.password;
    const hashPswd = await bcrypt.hash(password, 10);
    user.password = hashPswd;
    await user.save();
    const token = jwt.sign({id: user._id,},process.env.SECRET_KEY, {expiresIn: '1h'})
    res.status(201).json(`User Registered, ${token}`);
  } catch (err) {
    console.log(err);
    res.status(400).json("the user request is invalid");
  }
});

routes.get("/subscription/:username", async (req, res) => {
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
    res.status(404).json("Details not found");
  }
});

routes.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userLogin = await User.findOne({ $or: [{ username }, { email }] });

    if (userLogin) {
      if (await bcrypt.compare(password, userLogin.password)) {
        const token= jwt.sign({id: userLogin._id}, process.env.SECRET_KEY)
        res.status(200).json(`User logged in ${token}`);
      } else {
        res.status(404).json("User data not found");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(404).json("User not found");
  }
});
