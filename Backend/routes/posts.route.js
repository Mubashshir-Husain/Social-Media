import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllPost, createPost, getPost, updatePost, deletePost, getPostByUser } from "../controllers/post.controller.js";

let router = Router();

router.get("/allPost", authMiddleware, getAllPost);
router.post("/createPost", authMiddleware, createPost);
router.get("/getPost/:id", authMiddleware, getPost);
router.put("/updatePost/:id", authMiddleware, updatePost);
router.delete("/deletePost/:id", authMiddleware, deletePost);
router.get("/getPostByUser", authMiddleware, getPostByUser);   //User ke sare Post Nikalne ke liye


export default router;