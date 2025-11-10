import express from "express";

import {
  registerUser,
  loginUser,
  deleteUser,
  stripePaywall,
} from "../controllers/userController.js";

import protect from "../middleware/auth.js";

const routes = express.Router();

routes.post("/register", registerUser);

routes.post("/login", loginUser);

routes.post("/payment-gateway", protect, stripePaywall);

routes.delete("/:id", protect, deleteUser);

export default routes;
