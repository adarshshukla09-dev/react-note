import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { api } from '../api/User';
import { PlusCircle } from 'lucide-react';
function AllCard() {
  const [notes, setNotes] = useState([]);

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
  setNotes(prev => prev.filter(notes => notes._id !== id));
};
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 border-b-2 border-indigo-100 pb-2">
      Notes
      </h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 **lg:grid-cols-3** **xl:grid-cols-3** gap-8"> 
        {notes.map((note) => (
         
          <Card key={note._id} note={note} 
  onDelete={handleDeleteNote} />
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

export default AllCard;