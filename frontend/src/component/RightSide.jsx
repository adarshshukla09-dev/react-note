import React from "react";
import { Clock, Tag, X } from "lucide-react"; // Import modern icons
import { useNoteContext } from "../context/NoteContext";
// --- Tag Chip UI Component ---
const TagChip = ({ name }) => {
  // Use a more modern and accessible color scheme
  const colorClass =
    name === "Work"
      ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
      : name === "Design"
      ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <span
      className={`
        flex items-center space-x-1 text-xs font-semibold px-3 py-1 
        rounded-full cursor-pointer transition duration-150 ease-in-out
        ${colorClass}
      `}
    >
      <Tag size={12} className="opacity-70" />
      <span>{name}</span>
    </span>
  );
};


function RightSide() {
const { selectedNote: note } = useNoteContext();
  if (!note) {
    return (
      <div className="w-[400px] xl:w-[450px] bg-gray-50 h-screen shadow-inner flex items-center justify-center text-gray-500 border-l border-gray-200">
        <div className="text-center p-8">
          <p className="text-lg font-medium mb-2">👋 Welcome Back!</p>
          <p className="text-sm">
            Select a note from the left panel to view its full details here.
          </p>
        </div>
      </div>
    );
  }

  // Helper to format the date
  const formattedDate = note.date
    ? new Date(note.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date unavailable";

  return (
    <div className="w-[200px] xl:w-[350px] bg-white h-screen shadow-2xl overflow-y-auto border-l border-gray-200">
      <div className="p-8 h-full flex flex-col">
        {/* Note Header / Meta-info */}
        <div className="mb-4 text-sm text-gray-500">
          <span className="flex items-center space-x-2">
            <Clock size={16} />
            <span className="font-medium tracking-wide">
              Last Updated: {formattedDate}
            </span>
          </span>
        </div>

        {/* Note Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {note.title}
        </h1>

        {/* Note Body (Scrollable Content) */}
<div className="flex flex-col flex-grow overflow-y-auto pr-2 max-w-full">
  <p className="text-lg text-gray-800 leading-8 whitespace-pre-wrap break-words break-all max-w-full">
    {note.content}
  </p>
</div>

        {/* Tags Section (Fixed at bottom) */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
          <span className="text-sm font-semibold text-gray-600 mr-2 flex items-center space-x-1">
            <Tag size={16} />
            <span>Tags:</span>
          </span>
          {(note.tags || []).map((tag, index) => (
            <TagChip
              key={index}
              name={typeof tag === "string" ? tag : tag.name}
            />
          ))}
        </div>

        {/* Optional: Add an Edit/Delete button bar here */}
        <div className="mt-4 flex justify-end space-x-3">
          <button className="text-sm text-red-500 hover:text-red-700">
            Delete
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
