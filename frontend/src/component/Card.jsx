import React, { useState } from "react";
import { Star, Pencil, Trash2 } from "lucide-react";
import { useNoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { updateNote, deleteNote } from "../api/Note";
import axios  from "axios";
const getColorClasses = (accent) => {
  switch (accent) {
    case "yellow":
      return {
        bg: "bg-[#FFEFA1]",
        tagBg: "bg-yellow-200/50",
        tagText: "text-yellow-800",
        starColor: "text-yellow-600",
      };
    case "blue":
      return {
        bg: "bg-[#CDE8FF]",
        tagBg: "bg-blue-200/50",
        tagText: "text-blue-800",
        starColor: "text-blue-600",
      };
    case "pink":
      return {
        bg: "bg-[#FFD4E6]",
        tagBg: "bg-pink-200/50",
        tagText: "text-pink-800",
        starColor: "text-pink-600",
      };
    default:
      return {
        bg: "bg-white",
        tagBg: "bg-gray-200/50",
        tagText: "text-gray-700",
        starColor: "text-gray-600",
      };
  }
};

function Card({ note, onDelete }) {
  const { setSelectedNote, setEditNote } = useNoteContext();
  const { bg, starColor } = getColorClasses(note.accentColor);

  const [isFavorite, setIsFavorite] = useState(note.isFavorite || false);
  const navigate = useNavigate();

  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // ⭐ FIXED FAVORITE TOGGLE
  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();

    const updatedFavorite = !isFavorite;

    try {
    await axios.put(
  `http://localhost:5000/api/notes/${note._id}`,
  { isFavorite: updatedFavorite },
  { withCredentials: true }
);

      setIsFavorite(updatedFavorite);
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      await deleteNote(note._id);
      onDelete(note._id);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div
      onClick={() => setSelectedNote(note)}
      className={`relative w-full h-full p-6 flex flex-col justify-between 
      ${bg} rounded-xl shadow-lg border-t-4 border-b-2 border-transparent 
      hover:border-indigo-400 hover:shadow-xl cursor-pointer 
      transition-all duration-300 ease-in-out`}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          handleFavoriteToggle(e);
        }}
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/5"
      >
        <Star
          className={isFavorite ? `${starColor} fill-current` : "text-gray-400"}
          size={20}
        />
      </button>

      {/* Title and Description */}
      <div className="flex flex-col mb-4">
        <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-2 pr-10">
          {note.title}
        </h3>

        <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed whitespace-pre-wrap">
          {note.preview}
        </p>
      </div>

      {/* Footer: Date + Edit/Delete */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5">
        <span className="text-xs text-gray-500 font-medium tracking-wider">
          LAST EDITED: {formattedDate}
        </span>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditNote(note);
              navigate(`/edit/${note._id}`);
            }}
            className="p-1.5 hover:bg-indigo-100 text-indigo-600 rounded-lg"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
