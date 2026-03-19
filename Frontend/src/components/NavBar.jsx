import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {

  let {loggedIn} = useContext(AuthContext)

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-200 shadow-sm"
      style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
          Vibely
        </h1>

        {/* Links */}
        <ul className="flex gap-8 text-gray-700 font-medium">

          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
          </li>

          {
            loggedIn && (
              <>
                <li>
                <Link
                  to="/create"
                  className="hover:text-blue-600 transition duration-200"
                >
                  CreatePost
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="hover:text-blue-600 transition duration-200"
                >
                  Feed
                </Link>
              </li>
              </>
              
            )
          }

         {
            loggedIn ? (
             <li>
                <Link to="/profile" className="hover:text-blue-600 transition duration-200">
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/auth" className="hover:text-blue-600 transition duration-200">
                  Login
                </Link>
              </li>
            )
          }

        </ul>
      </div>

      {/* Blur bottom line */}
      <div
        style={{
          height: "2px",
          background: "linear-gradient(to right, transparent, #d1d5db, transparent)",
          filter: "blur(1px)",
        }}
      />
    </nav>
  );
}