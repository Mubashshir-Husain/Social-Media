import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { commentedPostsByUser, addComment, getAllComment, deleteComment } from "../controllers/comment.controller.js";

let router = Router();

router.post("/addComment/:postId", authMiddleware, addComment)   //Comment Add
router.delete("/deleteComment/:postId/:commentId", authMiddleware, deleteComment)   // delete Comment
router.get("/getAllComment/:postId/comments", authMiddleware, getAllComment)   // get All Comments of a Post
router.get("/commentedPost", authMiddleware, commentedPostsByUser)    // user ke comment kiye huy post nikalega


export default router;