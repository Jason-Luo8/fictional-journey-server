import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); //need to send details of the form, from frontend to backend
router.post("/signup", signup); //need to send details of the form, from frontend to backend

export default router;
