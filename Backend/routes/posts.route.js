import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllPost, createPost, getPost, updatePost, deletePost, getPostByUser, getPostByAnotherUser, followingPosts } from "../controllers/post.controller.js";

let router = Router();

router.get("/allPost", authMiddleware, getAllPost);
router.post("/createPost", authMiddleware, createPost);
router.get("/getPost/:id", authMiddleware, getPost);
router.put("/updatePost/:id", authMiddleware, updatePost);
router.delete("/deletePost/:id", authMiddleware, deletePost);
router.get("/getPostByAnotherUser/:id", authMiddleware, getPostByAnotherUser);   //Another ke sare Post Nikalne ke liye
router.get("/getPostByUser/:id", authMiddleware, getPostByUser);   //User ke sare Post Nikalne ke liye

router.get("/followingPosts", authMiddleware, followingPosts);   //show only following post



export default router;