import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNoteContext } from "../context/NoteContext";

function LeftSide({ activeMenu, setActiveMenu }) {
   const { searchQuery, setSearchQuery } = useNoteContext();
  const navButtonClasses =
    "w-full p-3 pl-4 flex items-center text-left rounded-xl font-medium transition-colors hover:bg-gray-100";
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isActive = (menu) =>
    activeMenu === menu
      ? "bg-[#DCE2FF] text-[#4B65F6] shadow-sm"
      : "text-[#666666]";

  return (
    <div className="w-65 h-screen rounded-xl shadow-xl p-5 flex flex-col justify-between font-inter">

      {/* TOP SECTION */}
      <div>
        {/* Logo */}
        <div className="h-[100px] mb-8 flex items-center p-2">
          <svg
            className="w-6 h-6 mr-2 text-[#4B65F6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <span className="text-2xl font-bold">Notes</span>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col gap-1 mt-4">
          <button
            onClick={() => {
                setActiveMenu("All"); // Set menu state to All
                navigate("/"); // Navigate to the Dashboard (root path)
              }}
            className={`${navButtonClasses} ${isActive("All")}`}
          >
            All Notes
          </button>

          <button
            onClick={() => {
              setActiveMenu("Favorites");
              navigate("/Favourite");
            }}
            className={`${navButtonClasses} ${isActive("Favorites")}`}
          >
            Favorites
          </button>
        </nav>
      </div>
  <div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B65F6]"
        />
        </div>
      {/* BOTTOM SECTION — LOGIN / LOGOUT TOGGLE */}
      <div className="mt-5">
        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full p-3 pl-4 text-left rounded-xl font-medium text-red-500 hover:bg-red-100 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full p-3 pl-4 text-left rounded-xl font-medium text-blue-500 hover:bg-blue-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default LeftSide;