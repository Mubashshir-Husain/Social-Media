import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Feed from './pages/Feed.jsx'
import Auth from './pages/Auth.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Profile from './pages/Profile.jsx'
import PostDetails from './pages/PostDetails.jsx'
import NotFound from './pages/NotFound.jsx'
import UpdatePost from './pages/Update.jsx'
import UserProfile from './pages/UserProfile.jsx'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/feed' element={<Feed />} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/:id" element={<UserProfile />} />
          {/* <Route path="/post/:id" element={<PostDetails/>} /> */}
          <Route path="/updatePost/:id" element={<UpdatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}