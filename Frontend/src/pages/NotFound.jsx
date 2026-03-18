import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-slate-50 to-indigo-50/40 pointer-events-none" />

      <div className="relative text-center">
        {/* Big 404 */}
        <h1 className="text-[9rem] font-bold leading-none tracking-tight bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-400 bg-clip-text text-transparent select-none">
          404
        </h1>

        {/* Divider accent */}
        <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-400 mb-6" />

        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">
          Page Not Found
        </p>

        <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="py-3 px-5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-200"
          >
            Go Home ✦
          </button>
        </div>
      </div>
    </div>
  );
}