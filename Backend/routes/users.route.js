import { Router } from "express";
import { register, login, userProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

let router = Router();


router.post("/register", register);
router.post("/login", login);

router.get("/userProfile", authMiddleware, userProfile);    //Logged-in user apni profile details dekh sake


export default router;