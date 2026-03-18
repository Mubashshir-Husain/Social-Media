import React, { useEffect, useState } from "react";
import api from "../api/api.jsx";
import PostCard from "../components/PostCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    api.get("/posts/allPost")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigate("/auth")
      }
    },[])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {posts.map((post) => (
            <PostCard key={post._id} post={post}  setPosts={setPosts} />
          ))}


        </div>

      </div>
    </div>
  );
}