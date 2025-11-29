import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import { api } from '../api/User';
import { PlusCircle } from 'lucide-react';
import LeftSide from "../component/LeftSide"; // Import LeftSide
import RightSide from "../component/RightSide"; // Import RightSide
import { NoteProvider, useNoteContext } from "../context/NoteContext"; // Import NoteProvider and useNoteContext

function Favourite() {
  const [notes, setNotes] = useState([]);
  // Get search state from context if needed for filtering/display
  const { searchQuery } = useNoteContext(); 
  
  // Filter logic remains the same (only favorite notes)
  const favoriteNotes = notes.filter(note => 
    note.isFavorite && (
      note.title.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
      note.content.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    )
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
    // Removed [notes] from dependency array to prevent infinite re-fetching
  }, []); 

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note._id !== id));
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 border-b-2 border-indigo-100 pb-2">
        Favourite Notes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

        {favoriteNotes.map(note => (
            <Card
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
            />
          ))}

        <Link to="/Create">
          <div className="
            flex flex-col items-center justify-center 
            bg-white 
            w-full h-[200px] 
            rounded-xl 
            border-2 border-dashed border-indigo-300 
            text-indigo-600 
            hover:border-indigo-500 hover:text-indigo-800 hover:shadow-lg 
            transition duration-300 ease-in-out
            p-4
          ">
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

// New wrapper component for the layout of Favourite
function FavouriteLayoutWrapper() {
  const [activeMenu, setActiveMenu] = useState("Favourite");

  // Since Favourite is typically a route, we wrap the layout logic here
  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
        <NoteProvider>
        {/* LEFT SIDE (Sticky + Scrollable) */}
        <div className="w-[250px] bg-white shadow-md sticky top-0 h-screen overflow-y-auto">
          <LeftSide 
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            // Passing a dummy function for onOpenCategory since it's not defined here
            onOpenCategory={() => {}} 
          />
        </div>

        {/* CENTER SCROLLABLE CARDS */}
        <div className="flex-grow max-w-[900px] h-screen overflow-y-auto p-4">
          <Favourite /> 
        </div>

        {/* RIGHT SIDE (Sticky + Scrollable) */}
        <div className="w-[400px] bg-white shadow-lg p-6 sticky top-0 h-screen overflow-y-auto">
          <RightSide />
        </div>
        </NoteProvider>
    </div>
  );
}

export default FavouriteLayoutWrapper;