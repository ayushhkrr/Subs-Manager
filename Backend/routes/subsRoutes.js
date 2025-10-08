import express from "express";

import {
  getSubscription,
  postSubscription,
  updateSubscription,
  deleteSubscription,
} from "subsController";
import protect from "../middleware/auth.js";

const routes = express.Router();

routes.get("/subscriptions/:username", protect, getSubscription);

routes.post("/subscriptions", protect, postSubscription);

routes.patch("/subscriptions/:id", protect, updateSubscription);

routes.delete("/subscriptions/:id", protect, deleteSubscription);

export default routes;
