import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api";
import { Heart, MessageCircle } from "lucide-react";

export default function PostCard({ post, setPosts, showActions = false, onDelete, onEdit }) {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // ✅ NEW STATES
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const isLiked = post.likes?.some(
    id => id.toString() === user?._id
  );

  // ✅ LIKE (same as before)
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

  // ✅ FETCH COMMENTS (only when opened 🔥)
  useEffect(() => {
    if (showComments) {
      api.get(`/comments/getAllComment/${post._id}/comments`)
        .then(res => setComments(res.data.comments))
        .catch(err => console.log(err));
    }
  }, [showComments, post._id]);

  // ✅ ADD COMMENT
  async function handleAddComment() {
    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/comments/addComment/${post._id}`, {
        text: commentText
      });

      setComments(prev => [...prev, res.data.comment]);
      setCommentText("");

      // update count
      setPosts(prev =>
        prev.map(p =>
          p._id === post._id
            ? { ...p, comments: [...p.comments, res.data.comment._id] }
            : p
        )
      );

    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleDeleteComment(commentId) {
  try {
    await api.delete(`/comments/deleteComment/${post._id}/${commentId}`);

    // UI se remove
    setComments(prev => prev.filter(c => c._id !== commentId));

    // count update
    setPosts(prev =>
      prev.map(p =>
        p._id === post._id
          ? { ...p, comments: p.comments.filter(id => id !== commentId) }
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
        <div onClick={() => navigate(`/profile/${post.postBy._id}`)} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <img
            src={post.postBy?.picture}
            alt="user"
            className="w-9 h-9 cursor-pointer rounded-full object-cover"
          />
          <h3 className="text-sm cursor-pointer font-semibold text-gray-700">
            {post.postBy?.userName}
          </h3>
        </div>

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

      <img
        src={post.postImage}
        alt="post"
        className="w-full object-cover"
        style={{ height: "220px" }}
      />

      <div className="p-4 flex flex-col gap-2 flex-1">

        <h2 className="text-sm font-bold text-gray-800">
          {post.postTitle}
        </h2>

        <p className="text-xs text-gray-500">
          {post.postDescription}
        </p>

        <div className="flex items-center justify-between gap-3 text-sm text-gray-600 mt-auto border-t pt-3">

          {/* LIKE */}
          <div
            onClick={handleLike}
            className={`flex items-center gap-1 cursor-pointer transition 
              ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-400"}
            `}
          >
            <Heart size={16} fill={isLiked ? "red" : "none"} />
            <span>{post.likes?.length || 0}</span>
          </div>

          {/* COMMENT TOGGLE */}
          <div
            onClick={() => setShowComments(prev => !prev)}
            className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition"
          >
            <MessageCircle size={16} />
            <span>{post.comments?.length || 0}</span>
          </div>

        </div>

        {/* ✅ COMMENTS SECTION (toggle) */}
        {showComments && (
          <div className="mt-3 flex flex-col gap-3">

            {/* LIST */}
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">

              {comments.map((c) => (
                <div key={c._id} className="flex items-start gap-2">

                  <img
                    src={c.user?.picture}
                    alt="user"
                    className="w-6 h-6 rounded-full object-cover"
                  />

                  <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs">
                    <span className="font-semibold mr-1">
                      {c.user?.userName}
                    </span>
                    {c.commentText}
                  </div>
                  {/* ✅ DELETE BUTTON (only own comment) */}
    {c.user?._id === user?._id && (
      <button
        onClick={() => handleDeleteComment(c._id)}
        className="text-white bg-red-500 rounded-full px-4 py-1 text-xs hover:underline cursor-pointer"
      >
        Delete
      </button>
    )}

                </div>
              ))}

            </div>

            {/* INPUT */}
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="w-full px-3 py-1.5 text-sm border rounded-full outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

          </div>
        )}

      </div>
    </div>
  );
}