import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { api } from '../api/User';
import { useNoteContext } from "../context/NoteContext";
import { useTheme } from "../context/ThemeContext"; // 1. Import useTheme
import { PlusCircle } from 'lucide-react';

function AllCard() {
  const [notes, setNotes] = useState([]);
  const { searchQuery } = useNoteContext();
  const { theme } = useTheme(); // 2. Get the current theme

  // --- Dynamic Theme Classes ---
  const containerClass = theme === 'dark' 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gray-50 text-gray-900";

  const headingClass = theme === 'dark' 
    ? "text-gray-100 border-indigo-700" 
    : "text-gray-900 border-indigo-100";

  const createLinkClass = theme === 'dark' 
    ? "bg-[#252525] border-indigo-500 text-indigo-400 hover:border-indigo-300 hover:text-indigo-200 hover:shadow-indigo-900/50"
    : "bg-white border-indigo-300 text-indigo-600 hover:border-indigo-500 hover:text-indigo-800 hover:shadow-lg";
  // -----------------------------

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes/");
        setNotes(res.data.notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note._id !== id));
  };

  const notesToRender = searchQuery.trim() !== "" ? filteredNotes : notes;

  return (
    <div className={`p-4 sm:p-8 min-h-screen ${containerClass}`}>
      <h1 className={`text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 border-b-2 pb-2 ${headingClass}`}>
        Notes
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"> 
        {/* Render Notes (Filtered or All) */}
        {notesToRender.map(note => ( 
          // Assuming the imported Card component internally uses the useTheme hook 
          // or accepts a theme prop for its own styling (recommended approach is internal useTheme)
          <Card key={note._id} note={note} onDelete={handleDeleteNote} /> 
        ))}

        {/* Create New Note Link */}
        <Link to="/Create">
          <div className={`
            flex flex-col items-center justify-center 
            w-full h-[200px] 
            rounded-xl 
            border-2 border-dashed 
            transition duration-300 ease-in-out
            p-4
            ${createLinkClass}
          `}>
            <PlusCircle size={48} strokeWidth={1.5} />
            <p className="mt-2 text-lg font-semibold">
              Create New Note
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AllCard;