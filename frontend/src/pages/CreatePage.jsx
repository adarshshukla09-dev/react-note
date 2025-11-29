import React from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api/User";
import { toast } from "react-toastify";
// --- Color and Category Data ---
const CATEGORY_DATA = [
  { id: 1, name: "Work", bgClass: "bg-blue-100", textClass: "text-blue-700" },
  {
    id: 2,
    name: "Ideas",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
  },
  {
    id: 3,
    name: "Personal",
    bgClass: "bg-pink-100",
    textClass: "text-pink-700",
  },
];

const BG_COLOR_OPTIONS = [
  { name: "White", color: "#FFFFFF", class: "bg-white", token: "white" },
  {
    name: "Pastel Yellow",
    color: "#FFEFA1",
    class: "bg-[#FFEFA1]",
    token: "yellow",
  },
  {
    name: "Pastel Blue",
    color: "#CDE8FF",
    class: "bg-[#CDE8FF]",
    token: "blue",
  },
  {
    name: "Pastel Pink",
    color: "#FFD4E6]",
    class: "bg-[#FFD4E6]",
    token: "pink",
  },
];


// ------------------ Create Page ------------------
function CreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Work");
  const [selectedBgColor, setSelectedBgColor] = React.useState(
    BG_COLOR_OPTIONS[0]
  );

  // ---------- Save Handler ----------
  const handleSave = async (e) => {
  e.preventDefault();

  const newNote = {
    title,
    content,
    accentColor: selectedBgColor.token,
    categories: [selectedCategory],
  };

  try {
    await api.post("/notes/create", newNote);

    // Reset the form
    setTitle("");
    setContent("");
    setSelectedBgColor(BG_COLOR_OPTIONS[0]);
    setSelectedCategory("Work");

    toast.success("Note created successfully!");

    navigate("/");   // ✅ Redirect user properly

  } catch (error) {
    toast.error("Failed to create note");
  }
};


  // ------------------ Header ------------------
  const Header = ({ onSave }) => (
    <header
      className={`flex justify-between items-center p-4 md:px-8 border-b border-[#EAEAEA] ${selectedBgColor.class} bg-white sticky top-0 z-20`}
    >
      <button className="icon-btn text-2xl">&#8592;</button>

      <button
        className="bg-[#4B65F6] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#3d4fd6] transition"
        onClick={onSave}
      >
        Save
      </button>

      <style jsx>{`
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 8px;
          border-radius: 10px;
        }
        .icon-btn:hover {
          background-color: #f0f0f0;
          color: #4b65f6;
        }
      `}</style>
    </header>
  );

  return (
    <div
      className={`w-full max-w-[1000px] h-screen md:h-[90vh] mx-auto ${selectedBgColor.class}
     rounded-xl shadow-2xl flex flex-col overflow-hidden font-inter transition-colors duration-300`}
    >
      <Header
        onSave={(e) => {
          handleSave(e);
        }}
      />


      {/* Category + Color Selectors */}
      <div className="flex justify-between items-center p-4 md:px-10 border-b border-[#EAEAEA]">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#666]">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-1 border border-gray-300 rounded-lg text-sm bg-white shadow-sm"
          >
            {CATEGORY_DATA.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-[#666]">Background:</label>
          <div className="flex gap-1">
            {BG_COLOR_OPTIONS.map((color) => (
              <button
                key={color.token}
                onClick={() => setSelectedBgColor(color)}
                className="w-5 h-5 rounded-full border-2"
                style={{
                  backgroundColor: color.color,
                  borderColor:
                    selectedBgColor.token === color.token
                      ? "#4B65F6"
                      : "transparent",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto relative">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold bg-transparent outline-none mb-4"
        />

        <div
          contentEditable="true"
          onInput={(e) => setContent(e.currentTarget.textContent)}
          className="min-h-[300px] outline-none text-base leading-relaxed"
        />

        <div className="absolute bottom-4 left-10 text-xs text-[#666] opacity-70">
          Auto-saved 5 seconds ago
        </div>
      </main>
    </div>
  );
}

export default CreatePage;
