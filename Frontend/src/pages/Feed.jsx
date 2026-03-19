import React, { useEffect, useState } from "react";
import api from "../api/api.jsx";
import PostCard from "../components/PostCard.jsx";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/followingPosts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 return (
  <div className="min-h-screen bg-gray-100 px-4 py-6">
    <div className="max-w-6xl mx-auto">

      {posts.length === 0 ? (
        // 👇 EMPTY STATE UI
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">

          <h2 className="text-lg font-semibold mb-2">
            No posts to show.....
          </h2>

          <p className="text-sm">
            You are not following anyone yet.
          </p>
          <p className="text-sm">
  Follow users to see their posts in your feed .....
</p>

        </div>
      ) : (
        // 👇 POSTS GRID
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))}
        </div>
      )}

    </div>
  </div>
);
}