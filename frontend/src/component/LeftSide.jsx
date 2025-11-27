import React from "react";

function LeftSide({ activeMenu, setActiveMenu, onOpenCategory }) {
  const navButtonClasses =
    "w-full p-3 pl-4 flex items-center text-left rounded-xl font-medium transition-colors hover:bg-gray-100";

  const isActive = (menu) =>
    activeMenu === menu
      ? "bg-[#DCE2FF] text-[#4B65F6] shadow-sm"
      : "text-[#666666]";

  return (
    <div className="w-65 h-screen rounded-xl shadow-xl p-5 flex flex-col font-inter">
      
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
        <button onClick={() => setActiveMenu("All")} className={`${navButtonClasses} ${isActive("All")}`}>
          All Notes
        </button>

        <button onClick={() => setActiveMenu("Favorites")} className={`${navButtonClasses} ${isActive("Favorites")}`}>
          Favorites
        </button>

        <button
          onClick={() => {
            setActiveMenu("Categories");
            onOpenCategory();
          }}
          className={`${navButtonClasses} ${isActive("Categories")}`}
        >
          Categories
        </button>

        <button onClick={() => setActiveMenu("Trash")} className={`${navButtonClasses} ${isActive("Trash")}`}>
          Trash
        </button>
      </nav>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-3 pl-5 rounded-full shadow-sm text-sm border border-[#E4E4E4] focus:ring-1 focus:ring-[#4B65F6] focus:border-[#4B65F6] transition-all focus:outline-none"
        />
      </div>
    </div>
  );
}

export default LeftSide;
