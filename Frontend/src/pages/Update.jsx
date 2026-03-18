import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [post, setPost] = useState({
    postTitle: "",
    postDescription: "",
    postImage: "",
  });

  useEffect(() => {
    api.get(`/posts/getPost/${id}`)
      .then((res) => {
        setPost(res.data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }, [id]);

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    api.put(`/posts/updatePost/${id}`, post)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating post ❌");
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-slate-50 to-indigo-50/40 pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Header label */}
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3 text-center">
          Content Manager
        </p>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-400" />

          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-1 tracking-tight">
              Update Post
            </h2>
            <p className="text-sm text-slate-400 mb-8">
              Edit your content below and save changes
            </p>

            {fetching ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 rounded-full border-2 border-blue-200 border-t-indigo-500 animate-spin" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="group">
                  <label className="block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    name="postTitle"
                    value={post.postTitle}
                    onChange={handleChange}
                    placeholder="Enter your post title..."
                    className="w-full px-4 py-3 bg-blue-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div className="group">
                  <label className="block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="postDescription"
                    value={post.postDescription}
                    onChange={handleChange}
                    placeholder="Write your post description..."
                    rows={4}
                    className="w-full px-4 py-3 bg-blue-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Image URL */}
                <div className="group">
                  <label className="block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1.5">
                    Image URL
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm">
                      🔗
                    </span>
                    <input
                      type="text"
                      name="postImage"
                      value={post.postImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-9 pr-4 py-3 bg-blue-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-300 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Image preview */}
                {post.postImage && (
                  <div className="rounded-xl overflow-hidden border border-blue-100 h-36 bg-slate-50">
                    <img
                      src={post.postImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-2 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes ✦"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Post ID: <span className="font-mono text-slate-500">{id}</span>
        </p>
      </div>
    </div>
  );
}