import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export async function getAllPost(req,res){
    try {
        let data = await postModel.find().populate("postBy","userName picture createdAt updatedAt");
        return res.json(data);
    } catch (error) {
        return res.json({
            message: "can't get posts",
            error
        })
    }}

export async function createPost(req,res){
    try {
        let post = req.body;
        post.postBy = req.user._id; // Ensure post is always assigned to the authenticated user
        await postModel.create(post);
        return res.json({
            message: "post created successfully"
        })
    } catch (error) {
        return res.json({
            message: "can't create post",
            error
        })
    }
}

export async function getPost(req,res){
    try {
        let id = req.params.id;
        let data = await postModel.findById(id).populate("postBy","userName picture createdAt updatedAt");
        return res.json(data);
    } catch (error) {
        return res.json({
            message: "can't get post",
            error
        })
    }
}

export async function updatePost(req,res){
    try {
         let id = req.params.id;
        const post = await postModel.findById(id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Verify the logged in user is the owner of the post
        if (post.postBy.toString() !== req.user._id) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }
        await postModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.json({
            message: "post updated successfully"
        })
    } catch (error) {
        return res.json({
            message: "can't update post",
            error
        })
    }
}

export async function deletePost(req,res){
    try {
       let id = req.params.id;
        const post = await postModel.findById(id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Verify the logged in user is the owner of the post
        if (post.postBy.toString() !== req.user._id) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await postModel.findByIdAndDelete(id);
        return res.json({
            message: "post deleted successfully"
        })
    } catch (error) {
        return res.json({
            message: "can't delete post",
            error
        })
    }
}


export async function getPostByAnotherUser(req,res){
    try {
        let id =  req.params.id ;
        let posts = await postModel.find({postBy:id}).populate("postBy","userName picture createdAt");
         return res.json({
            success:true,
            totalPosts:posts.length,
            posts
        })
    } catch (error) {
        return res.json({
            message: "can't get user posts",
            error
        })
    }
}


export async function getPostByUser(req,res){
    try {
        let id =  req.user._id ;
        let posts = await postModel.find({postBy:id}).populate("postBy","userName picture createdAt");
         return res.json({
            success:true,
            totalPosts:posts.length,
            posts
        })
    } catch (error) {
        return res.json({
            message: "can't get user posts",
            error
        })
    }
}




export async function followingPosts (req, res) {
  const user = await userModel.findById(req.user._id);

  const posts = await postModel.find({
    postBy: { $in: user.following }
  })
  .populate("postBy")
  .sort({ createdAt: -1 });

  res.json(posts);
};