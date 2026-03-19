import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PostCard from "../components/PostCard.jsx";

export default function Profile() {

  const { setLoggedIn } = useContext(AuthContext)

  const [user, setUser] = useState({})
  const [activeTab, setActiveTab] = useState(0)
  const [posts, setPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const [comments, setComments] = useState([])

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")

    setLoggedIn(false)
    navigate("/auth")
  }

  // get user profile
  useEffect(() => {

    if (!token) {
      navigate("/auth")
      return
    }

    api.get("/users/userProfile")
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {

        if (err.response?.data?.message === "Invalid Token...") {
          handleLogout()
        }

        console.log(err.response?.data)
      })

  }, [token])


  // tabs api calls
  useEffect(() => {

    if (activeTab === 0) {

      api.get(`/posts/getPostByUser/${user._id}`)
        .then((res) => {
          setPosts(res.data.posts || [])
          // console.log(res.data.posts)
        })
        .catch((err) => console.log(err.response?.data))

    }

    if (activeTab === 1) {

      api.get("/likes/likedPosts")
        .then((res) => {
          setLikedPosts(res.data.posts || [])
        })
        .catch((err) => console.log(err.response?.data))

    }

    if (activeTab === 2) {

      api.get("/comments/commentedPost")
        .then((res) => {
          // console.log(res.data.posts)
          setComments(res.data.posts || [])
        })
        .catch((err) => console.log(err.response?.data))

    }

  }, [activeTab])


  const handleDelete = async (id) => {
    api.delete(`/posts/deletePost/${id}`)
      .then((res) => {
        console.log(res.data)
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id))
      })
      .catch((err) => console.log(err.response?.data))
  }

  const handleEdit = (id) => {
    navigate(`/updatePost/${id}`)
  }


  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">

      {/* Profile Card */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center w-80 mb-8">

        <img
          src={user?.picture}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500"
        />

        <h2 className="text-xl font-semibold text-gray-800">
          {user?.userName}
        </h2>

        <div className="flex justify-center gap-6 mt-3 text-sm text-gray-600">

          <div>
            <span className="font-semibold">
              {user?.followers?.length || 0}
            </span>
            <p>Followers</p>
          </div>

          <div>
            <span className="font-semibold">
              {user?.following?.length || 0}
            </span>
            <p>Following</p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
        >
          Logout
        </button>

      </div>


      {/* Tabs */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-2xl p-6">

        <Tabs onSelect={(index) => setActiveTab(index)}>

          <TabList className="flex bg-gray-100 rounded-lg p-1 mb-6">

            {["My Posts", "Liked Posts", "My Comments"].map((label) => (

              <Tab
                key={label}
                className="flex-1 text-center py-2 rounded-md text-gray-600 cursor-pointer text-sm font-medium transition-all"
                selectedClassName="bg-purple-600 text-white shadow"
              >
                {label}
              </Tab>

            ))}

          </TabList>


          {/* My Posts */}

          <TabPanel>

            {posts.length > 0 ? (

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {posts.map((post) => (
                  <PostCard key={post._id} post={post} showActions={true} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </ul>

            ) : (
              <p className="text-center text-gray-500 py-8">
                No posts yet.
              </p>
            )}

          </TabPanel>


          {/* Liked Posts */}

          <TabPanel>

            {likedPosts.length > 0 ? (

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {likedPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </ul>

            ) : (
              <p className="text-center text-gray-500 py-8">
                No liked posts yet.
              </p>
            )}

          </TabPanel>


          {/* Comments */}

          <TabPanel>

            {comments.length > 0 ? (

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {comments.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}

              </ul>

            ) : (
              <p className="text-center text-gray-500 py-8">
                No comments yet.
              </p>
            )}

          </TabPanel>

        </Tabs>

      </div>

    </div>

  )

}