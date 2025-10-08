import { User, Subscription } from "../model/allSchemas.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body
  try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
     if (existingUser) {
       return res.status(400).json({ message: "User already exists" });
     }
    const user = User(req.body);
    const password = req.body.password;
    const hashPswd = await bcrypt.hash(password, 10);
    user.password = hashPswd;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json(`User Registered, ${token}`);
  } catch (err) {
    console.log(err);
    res.status(400).json("Bad request");
  }
};

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userLogin = await User.findOne({ $or: [{ username }, { email }] });

    if (userLogin) {
      if (await bcrypt.compare(password, userLogin.password)) {
        const token = jwt.sign({ id: userLogin._id }, process.env.SECRET_KEY);
        res.status(200).json({ message: "User logged in", token });
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
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user._id.toString() === req.user.id) {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      const allSubDelete = await Subscription.deleteMany({
        userId: deleteUser._id,
      });
      const subText =
        allSubDelete.deletedCount === 0 || allSubDelete.deletedCount === 1
          ? "subscription"
          : "subscriptions";
      res
        .status(200)
        .json(
          `User ${deleteUser.username} and all their ${allSubDelete.deletedCount} ${subText} have been deleted`
        );
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    console.error(e);
    res.status(400).json("Bad request");
  }
};
