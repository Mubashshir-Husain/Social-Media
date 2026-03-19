import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../api/api";
import PostCard from "../components/PostCard.jsx";

export default function UserProfile() {

    const { user: currentUser } = useContext(AuthContext);

    const { id } = useParams(); // 👈 URL se user id

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (user && currentUser) {
            const isFollow = user.followers?.some(
                id => id.toString() === currentUser._id
            );

            setIsFollowing(isFollow);
            setFollowersCount(user.followers?.length || 0);
        }
    }, [user, currentUser]);

    // 🔥 Get user data
    useEffect(() => {

        api.get(`/users/profile/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err.response?.data));

    }, [id]);

    //  Get user posts
    useEffect(() => {

        api.get(`/posts/getPostByAnotherUser/${id}`) //  backend API
            .then((res) => {
                setPosts(res.data.posts || []);
            })
            .catch((err) => console.log(err.response?.data));

    }, [id]);

    const handleFollow = async () => {
        if (!currentUser) return;

        setLoading(true);

        try {
            await api.post(`/followers/followUser/${user._id}`);

            if (isFollowing) {
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
            } else {
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
            }

        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

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

                <p className="text-sm text-gray-600 mt-2">
                    {followersCount} Followers
                </p>


                {/* 👇 Future me Follow button add kar sakta hai */}
                {currentUser?._id !== user?._id && (
                    <button
                        onClick={handleFollow}
                        disabled={loading}
                        className={`mt-5 w-full py-2 rounded-lg text-sm transition ${isFollowing
                            ? "bg-gray-400 text-white"
                            : "bg-purple-500 hover:bg-purple-600 text-white"
                            }`}
                    >
                        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
                    </button>
                )}

            </div>

            {/* User Posts */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-md w-full max-w-2xl p-6">

                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Posts
                </h3>

                {posts.length > 0 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}

                    </div>

                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No posts yet.
                    </p>
                )}

            </div>

        </div>
    );
}