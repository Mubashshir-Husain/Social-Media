import React, { useEffect} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import api from '../api/api';
import {useNavigate,Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Auth() {

  let {setLoggedIn} = useContext(AuthContext)

  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/profile")
    }
  },[])


  async function handleLogin(e){
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email,password);
     
    try{
          const res = await api.post("/users/login",{email,password});

          let data = res.data;

          // console.log(data);

          if(data.tokens.accessToken){
            localStorage.setItem("token",data.tokens.accessToken);
              
            setLoggedIn(true);
            navigate("/profile");
            // console.log(data);
          }else{
            console.log(data.message);
          }

    }catch(error){  
       console.log(error.response?.data);
    }
  }

  async function handleSignup(e){
    e.preventDefault();
    const userName = e.target.userName.value;
    const picture = e.target.picture.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(userName,email,password);

    try {
        const res = await api.post("/users/register",{
          userName,
          picture,
          email,
          password
        })

          let data = res.data

          alert(data.message)
          console.log(data)


        }
     catch (error) {
      console.log(error.response?.data)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200">

      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-2xl shadow-xl w-96">

        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Vibely</h1>
          <p className="text-slate-500 text-sm mt-1">Connect. Share. Vibe.</p>
        </div>

        <Tabs>
          {/* Tab Switcher */}
          <TabList className="flex bg-slate-200 rounded-xl p-1 mb-6">
            <Tab
              className="flex-1 text-center py-2 rounded-lg text-slate-600 cursor-pointer text-sm font-medium transition-all duration-200 focus:outline-none"
              selectedClassName="bg-purple-600 text-white shadow-md"
            >
              Log In
            </Tab>
            <Tab
              className="flex-1 text-center py-2 rounded-lg text-slate-600 cursor-pointer text-sm font-medium transition-all duration-200 focus:outline-none"
              selectedClassName="bg-purple-600 text-white shadow-md"
            >
              Sign Up
            </Tab>
          </TabList>

          {/* Login Panel */}
          <TabPanel>
            <div className="space-y-3">
             <form onSubmit={handleLogin}>
               <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="text-right">
                <Link to="" className="text-xs text-purple-600 hover:text-purple-500 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 cursor-pointer text-white font-semibold py-3 rounded-xl text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-2">
                Log In
              </button>
             </form>
            </div>
          </TabPanel>

          {/* Signup Panel */}
          <TabPanel>
            <div className="space-y-3">
              <form onSubmit={handleSignup}>
                <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Username</label>
                <input
                  type="text"
                  name="userName"
                  placeholder="cooluser123"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Profile Picture URL</label>
                <input
                  type="text"
                  name="picture"
                  placeholder="https://..."
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1 ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 cursor-pointer text-white font-semibold py-3 rounded-xl text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-2">
                Create Account
              </button>
              </form>
            </div>
          </TabPanel>

        </Tabs>
      </div>
    </div>
  )
} 