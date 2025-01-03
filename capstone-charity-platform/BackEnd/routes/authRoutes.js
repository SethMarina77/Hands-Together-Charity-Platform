import express from "express";
const router = express.Router();
import cors from "cors";
import authController from "../controllers/authController.js";
import { logoutUser } from "../controllers/authController.js";

const { test, registerUser, loginUser, getProfile } = authController;

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Logout route
router.post("/logout", logoutUser);

router.get("/", test);
router.post("/Register", registerUser);
router.post("/Login", loginUser);
router.get("/profile", getProfile);

export default router;
