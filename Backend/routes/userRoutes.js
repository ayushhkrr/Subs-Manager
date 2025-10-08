import express from "express";
import { registerUser, loginUser, deleteUser } from "userController";

import protect from "../middleware/auth.js";

const routes = express.Router();

routes.post("/register", registerUser);

routes.post("/login", loginUser);

routes.delete("/deleteUser/:id", protect, deleteUser);

export default routes;
