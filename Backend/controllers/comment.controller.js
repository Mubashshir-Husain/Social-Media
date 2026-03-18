import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export async function addComment(req, res) {

    try {

        let postId = req.params.postId;

        let post = await postModel.findById(postId);

        if (!post) {
            return res.json({
                message: "post not found"
            })
        }

        let commentData = await commentModel.create({ commentText: req.body.text || req.body.commentText, user: req.user._id, post: postId })

        post.comments.push(commentData._id)

        await post.save()

        return res.json({
            message: "comment added successfully",
            comment: commentData
        })

    } catch (error) {
        return res.json({
            message: "can't add comment",
            error: error.message
        })

    }

}


export async function deleteComment(req, res) {

    try {

        let { postId, commentId } = req.params;

        let post = await postModel.findById(postId)

        if (!post) {
            return res.json({
                message: "post not found"
            })
        }

        let comment = await commentModel.findById(commentId)

        if (!comment) {
            return res.json({
                message: "comment not found"
            })
        }

        // check comment owner
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.json({
                message: "You can delete only your comment"
            })
        }

        post.comments.pull(commentId)

        await post.save()

        await commentModel.findByIdAndDelete(commentId)

        return res.json({
            message: "comment deleted successfully"
        })

    } catch (error) {

        return res.json({
            message: "can't delete comment",
            error: error.message
        })

    }

}


// get All Comments of a Post
export async function getAllComment(req, res) {
    try {
        let postId = req.params.postId;

        let post = await postModel.findById(postId).populate("comments.commentBy", "userName picture");

        return res.json({
            message: "comments fetched successfully",
            comments: post.comments
        })
        } catch (error) {
        return res.json({
            message: "can't get comments",
            error
        })
    }
}


// user ke comment kiye huy post nikalega

export async function commentedPostsByUser(req, res) {
    try {
        let userId = req.user._id;

         // user ke comments
        let comments = await commentModel.find({
            user: userId
        });

        let postIds = comments.map(comment => comment.post);

        let posts = await postModel.find({
            _id: {
                // $in: [1,2,3,4] Jin Post par user ke comment kiye huy post nikalega
                $in: postIds
            }
        }).populate("postBy", "userName picture createdAt updatedAt");

        return res.json({
            message: "commented posts fetched successfully",
            posts
        })

    } catch (error) {
        return res.json({
            message: "can't get commented posts",
            error
        })
    }
}