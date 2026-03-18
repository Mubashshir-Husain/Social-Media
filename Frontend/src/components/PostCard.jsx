import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api";
import { Heart, MessageCircle } from "lucide-react";

export default function PostCard({ post, setPosts, showActions = false, onDelete, onEdit }) {

  const { user } = useContext(AuthContext);

  const isLiked = post.likes?.some(
    id => id.toString() === user?._id
  );

  async function handleLike() {
    try {
      const res = await api.put(`/likes/likePost/${post._id}`);

      setPosts(prev =>
        prev.map(p =>
          p._id === post._id
            ? { ...p, likes: res.data.likes }
            : p
        )
      );

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200">

      <div className="flex justify-between items-center">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <img
            src={post.postBy?.picture}
            alt="user"
            className="w-9 h-9 rounded-full object-cover"
          />

          <h3 className="text-sm font-semibold text-gray-700">
            {post.postBy?.userName}
          </h3>
        </div>


        {/* Actions */}
        {showActions && (
          <div>
            <button
              onClick={() => onEdit(post._id)}
              className="text-white bg-red-500 rounded-full px-4 py-1 mx-2 text-xs cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="text-white bg-red-500 rounded-full px-4 py-1 mx-2 text-xs cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}

      </div>

      {/* Post Image */}
      <img
        src={post.postImage}
        alt="post"
        className="w-full object-cover"
        style={{ height: "220px" }}
      />

      {/* Post Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        <h2 className="text-sm font-bold text-gray-800">
          {post.postTitle}
        </h2>

        <p className="text-xs text-gray-500">
          {post.postDescription}
        </p>

        <div className="flex items-center justify-between gap-3 text-sm text-gray-600 mt-auto border-t pt-3">

          {/* Likes */}
          <div
            onClick={handleLike}
            className={`flex items-center gap-1 cursor-pointer transition 
    ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-400"}
  `}
          >
            <Heart size={16} fill={isLiked ? "red" : "none"} />
            <span>{post.likes?.length || 0}</span>
          </div>

          {/* Comments Count */}
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition">
            <MessageCircle size={16} />
            <span>{post.comments?.length || 0}</span>
          </div>

          {/* Comment Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full px-3 py-1.5 text-sm border rounded-full outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

        </div>
      </div>

    </div>
  );
}