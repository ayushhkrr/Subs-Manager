import express from "express";

import {
  getSubscription,
  postSubscription,
  updateSubscription,
  deleteSubscription,
  subsDashboard
} from '../controllers/subsController.js';
import protect from "../middleware/auth.js";

const routes = express.Router();

routes.get("/", protect, getSubscription);

routes.post("/", protect, postSubscription);

routes.patch("/:id", protect, updateSubscription);

routes.delete("/:id", protect, deleteSubscription);

routes.get('/summary', protect, subsDashboard)

export default routes;
