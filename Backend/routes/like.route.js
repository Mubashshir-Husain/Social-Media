import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { likedPostsByUser, likePost } from "../controllers/like.controller.js";

let router = Router();

router.put("/likePost/:id", authMiddleware, likePost)    //Like Add-Subtract api
router.get("/likedPosts", authMiddleware, likedPostsByUser)    // user ke like kiye huy post nikalega


export default router;