import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/configDb.js";
import userRoutes from "./routes/users.route.js";
import postRoutes from "./routes/posts.route.js";
import likeRoutes from "./routes/like.route.js";
import commentRoutes from "./routes/comments.route.js";
import followersRoute from "./routes/followers.route.js"

let PORT = process.env.PORT;


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    return res.json({ message: "Welcome to the backend" });
})

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/followers", followersRoute)



app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});