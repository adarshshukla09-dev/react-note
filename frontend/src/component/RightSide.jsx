import React, { useState } from "react";
import { 
  Clock, Tag, X, Calendar as CalendarIcon, 
  ChevronLeft, ChevronRight 
} from "lucide-react";
import { useNoteContext } from "../context/NoteContext";
import dayjs from "dayjs";
import { useTheme } from "../context/ThemeContext"; 

// --------------------------------------------------
// 🎯 Highlight URLs inside text
// --------------------------------------------------
const highlightLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 underline break-all"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

// --------------------------------------------------
// 🗓️ Improved Simple Calendar (Theme-aware)
// --------------------------------------------------
const SimpleCalendar = ({ theme }) => { 
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const startOfMonth = currentMonth.startOf("month");
  const startDayOfWeek = startOfMonth.day();

  // Calendar Theme Classes
  const calendarClasses = theme === 'dark' 
    ? "bg-[#252525] text-gray-100 border border-gray-700" 
    : "bg-white text-gray-800 border border-gray-100";
    
  // Text color for the header and non-current month days
  const headerTextClass = theme === 'dark' ? "text-gray-300" : "text-gray-800";
  const dimTextClass = theme === 'dark' ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700";


  const generateDays = () => {
    const days = [];
    let day = startOfMonth.subtract(startDayOfWeek, "day");
    for (let i = 0; i < 42; i++) {
      days.push(day);
      day = day.add(1, "day");
    }
    return days;
  };

  const days = generateDays();
  const today = dayjs();

  return (
    <div className={`p-4 rounded-xl shadow-md animate-fadeIn ${calendarClasses}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className={`p-1 ${dimTextClass}`}
        >
          <ChevronLeft size={16} />
        </button>

        <h2 className={`text-lg font-bold flex items-center space-x-2 ${headerTextClass}`}>
          <CalendarIcon size={20} className="text-indigo-600" />
          <span>{currentMonth.format("MMMM YYYY")}</span>
        </h2>

        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className={`p-1 ${dimTextClass}`}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          const isToday = date.isSame(today, "day");
          const isCurrentMonth = date.isSame(currentMonth, "month");

          let dayClass = '';
          if (isToday) {
              dayClass = "bg-indigo-600 text-white font-bold";
          } else if (isCurrentMonth) {
              dayClass = theme === 'dark' 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-800 hover:bg-gray-100";
          } else {
              dayClass = "text-gray-500";
          }

          return (
            <div
              key={i}
              className={`h-8 w-8 flex items-center justify-center text-sm rounded-full ${dayClass}`}
            >
              {date.format("D")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --------------------------------------------------
// 🏷️ Tag Component
// --------------------------------------------------
const TagChip = ({ name }) => {
  // Theme logic for tags can be complex, keeping this simple for now
  const colorClass =
    name === "Work"
      ? "bg-indigo-100 text-indigo-700"
      : name === "Design"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer ${colorClass}`}
    >
      <Tag size={12} className="opacity-70" />
      <span>{name}</span>
    </span>
  );
};

// --------------------------------------------------
// 📄 Main RightSide Component
// --------------------------------------------------
function RightSide() {
  const { selectedNote: note } = useNoteContext();
  const { theme } = useTheme(); 

  // --- Theme Classes Definitions ---
  const containerClasses = theme === 'dark' 
    ? "bg-[#1E1E1E] text-gray-100 shadow-2xl border-l border-gray-800" 
    : "bg-white text-gray-800 shadow-2xl border-l border-gray-200";

  const fallbackBgClass = theme === 'dark' 
    ? "bg-gray-900 text-gray-400 border-l border-gray-700" 
    : "bg-gray-50 text-gray-500 border-l border-gray-200";

  const detailHeaderClass = theme === 'dark' ? "text-gray-400" : "text-gray-500";
  const titleClass = theme === 'dark' ? "text-gray-100" : "text-gray-900";
  const contentClass = theme === 'dark' ? "text-gray-300" : "text-gray-800";
  const dividerClass = theme === 'dark' ? "border-t border-gray-700" : "border-t";
  // ---------------------------------

  // If nothing is selected (Fallback View)
  if (!note) {
    return (
      <div className={`w-[300px] xl:w-[350px] h-screen shadow-inner flex items-center justify-center ${fallbackBgClass}`}>
        <div className="text-center p-8 animate-fadeIn">
          <p className="text-lg font-medium mb-2">👋 Welcome Back!</p>
          <p className="text-sm mb-6">Select a note to view its full details.</p>
          {/* SimpleCalendar now receives the theme prop */}
          <SimpleCalendar theme={theme} /> 
        </div>
      </div>
    );
  }

  // Word count + reading time
  const wordCount = note.content?.trim().split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const formattedDate = new Date(note.updatedAt || note.date).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className={`w-[300px] xl:w-[350px] h-screen ${containerClasses} animate-fadeIn`}>
      <div className="p-8 h-full flex flex-col gap-4">

        {/* Header + last update */}
        <div className={`text-sm flex items-center space-x-2 ${detailHeaderClass}`}>
          <Clock size={16} />
          <span>Last Updated: {formattedDate}</span>
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-extrabold leading-tight break-words ${titleClass}`}>
          {note.title}
        </h1>

        {/* CONTENT: Scrollable + safe wrapping */}
        <div className="flex-1 overflow-y-auto pr-2 max-h-[calc(100vh-260px)] border-l-4 border-indigo-200 pl-3 rounded">
          <p className={`text-lg leading-7 whitespace-pre-wrap break-words ${contentClass}`}>
            {highlightLinks(note.content)}
          </p>
        </div>

        {/* Stats */}
        <div className={`text-xs ${detailHeaderClass}`}>
          <p>{wordCount} words • {readingTime} min read</p>
        </div>

        <div className={`pt-4 flex flex-wrap gap-3 ${dividerClass}`}>
          {/* Tags can be rendered here */}
        </div>

      </div>
    </div>
  );
}

export default RightSide;