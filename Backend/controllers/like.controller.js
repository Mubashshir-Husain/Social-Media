import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

export async function likePost(req,res){
    try {
        let postId = req.params.id;
        let userId = req.user._id;

        let post = await postModel.findById(postId);
        if(!post){
            return res.json({message:"post not found"})
        }

        const isLiked = post.likes.some(id => id.toString() === userId);

        if(isLiked){
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.json({
            message: isLiked ? "post unliked successfully" : "post liked successfully",
            likes: post.likes   //  IMPORTANT
        });

    } catch (error) {
        return res.json({message:"can't like post",error})
    }
}

export async function likedPostsByUser(req,res){
    try {
        let userId = req.user._id;
        let posts = await postModel.find({likes:userId}).populate("postBy","userName picture createdAt updatedAt");
        return res.json({
            message:"liked posts fetched successfully",
            posts
        })
    } catch (error) {
        return res.json({message:"can't get liked posts",error})
    }
}