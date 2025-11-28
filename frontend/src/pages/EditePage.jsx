import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { updateNote } from "../api/Note";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";

const CATEGORY_DATA = [
  { id: 1, name: "Work" },
  { id: 2, name: "Ideas" },
  { id: 3, name: "Personal" },
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
    color: "#FFD4E6",
    class: "bg-[#FFD4E6]",
    token: "pink",
  },
];

function EditPage() {
  const navigate = useNavigate();
  const { editNote } = useNoteContext();
  const contentRef = useRef(null);

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Work");
  const [selectedBgColor, setSelectedBgColor] = useState(BG_COLOR_OPTIONS[0]);

  // --- LOAD NOTE DATA ---
  useEffect(() => {
    if (!editNote) return;
    console.log(editNote);
    setNote(editNote);
    setTitle(editNote.title);
    setContent(editNote.content);

    setSelectedCategory(editNote.categories?.[0] || "Work");

    const bg = BG_COLOR_OPTIONS.find((c) => c.token === editNote.accentColor);
    setSelectedBgColor(bg || BG_COLOR_OPTIONS[0]);

    // display HTML content inside editable div
    if (contentRef.current) {
      contentRef.current.innerHTML = editNote.content;
    }
  }, [editNote]);

  // --- SAVE NOTE ---
  const handleSave = async () => {
    const updatedNote = {
      title,
      content,
      categories: [selectedCategory],
      accentColor: selectedBgColor.token,
    };

    try {
      console.log(title);
      await updateNote(editNote._id, updatedNote);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update note.");
    }
  };

  return (
    <div
      className={`w-full max-w-[1000px] mx-auto h-screen ${selectedBgColor.class} rounded-xl shadow-xl flex flex-col`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <button onClick={() => navigate(-1)} className="text-2xl">
          ←
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#4B65F6] text-white rounded-lg"
        >
          Update
        </button>
      </div>

      {/* CONTENT */}
      <main className="p-6 flex-grow overflow-y-auto">
        <input
          type="text"
          value={title}
          placeholder="Note Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold outline-none bg-transparent"
        />

        <div
          ref={contentRef}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          className="min-h-[300px] outline-none text-base"
        ></div>
      </main>
    </div>
  );
}

export default EditPage;
