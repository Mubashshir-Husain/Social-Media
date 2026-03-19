import { Router } from "express";

import { followUser} from "../controllers/followers.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

let router = Router();

router.post("/followUser/:id", authMiddleware, followUser);    


export default router;