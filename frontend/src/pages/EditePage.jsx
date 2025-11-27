import React, { useState, useEffect } from 'react';

// --- Color and Category Data (Reused from CreatePage) ---
const CATEGORY_DATA = [
  { id: 1, name: 'Work', bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
  { id: 2, name: 'Ideas', bgClass: 'bg-yellow-100', textClass: 'text-yellow-700' },
  { id: 3, name: 'Personal', bgClass: 'bg-pink-100', textClass: 'text-pink-700' },
];

const BG_COLOR_OPTIONS = [
  { name: 'White', color: '#FFFFFF', class: 'bg-white', token: 'white' },
  { name: 'Pastel Yellow', color: '#FFEFA1', class: 'bg-[#FFEFA1]', token: 'yellow' },
  { name: 'Pastel Blue', color: '#CDE8FF', class: 'bg-[#CDE8FF]', token: 'blue' },
  { name: 'Pastel Pink', color: '#FFD4E6', class: 'bg-[#FFD4E6]', token: 'pink' },
];

// --- Sample Note Data (Simulates fetching a note to edit) ---
const sampleNoteToEdit = {
    id: 42,
    initialTitle: "Project Brainstorm - Q4 Features",
    initialContent: "Brainstorming new features for the app, including user onboarding flow redesign, dark mode implementation, and new organizational features like nested tags. Need to schedule follow-up with the design team.",
    initialCategory: 'Work',
    initialBgColorToken: 'blue' // Key to select the starting color option
};

// --- Sub-Component: Toolbar (Same as before) ---
const Toolbar = () => (
  <div className="flex gap-2 p-3 border-b border-[#EAEAEA] bg-white sticky top-0 z-10">
    <button className="toolbar-icon" title="Bold">B</button>
    <button className="toolbar-icon" title="Italic">I</button>
    <button className="toolbar-icon" title="Bullet List">&#8226; List</button>
    <button className="toolbar-icon" title="Add Image">Image</button>
    <button className="toolbar-icon" title="Link">Link</button>
    <style jsx>{`
      .toolbar-icon {
        background-color: var(--color-white);
        color: var(--color-text-secondary);
        border: 1px solid #E4E4E4;
        padding: 6px 12px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
      }
      .toolbar-icon:hover {
        background-color: #4B65F6;
        color: white;
        border-color: #4B65F6;
      }
    `}</style>
  </div>
);

// --- Sub-Component: Header (Same as before) ---
const Header = () => (
  <header className="flex justify-between items-center p-4 md:px-8 border-b border-[#EAEAEA] bg-white sticky top-0 z-20">
    <button className="icon-btn text-2xl" aria-label="Back to Notes">&#8592;</button>
    
    <div className="flex gap-3">
      <button className="icon-btn text-lg" aria-label="Share Note">Share</button> 
      <button className="icon-btn text-lg text-red-500 hover:text-red-700" aria-label="Delete Note">
        &times; Delete
      </button> 
    </div>

    <style jsx>{`
      .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #666666;
        padding: 8px;
        border-radius: 10px;
        transition: background-color 0.2s, color 0.2s;
      }
      .icon-btn:hover {
        background-color: #F0F0F0;
        color: #4B65F6;
      }
    `}</style>
  </header>
);

// --- Main Component: EditePage ---
function EditePage({ noteData = sampleNoteToEdit }) {
  // Find the initial color object based on the token in the note data
  const initialColor = BG_COLOR_OPTIONS.find(opt => opt.token === noteData.initialBgColorToken) || BG_COLOR_OPTIONS[0];

  const [title, setTitle] = useState(noteData.initialTitle);
  const [content, setContent] = useState(noteData.initialContent);
  const [selectedCategory, setSelectedCategory] = useState(noteData.initialCategory);
  const [selectedBgColor, setSelectedBgColor] = useState(initialColor);
  
  // Use useEffect to update the contenteditable div's innerHTML
  // This is often needed when loading initial HTML content into a contentEditable div
  const contentRef = React.useRef(null);
  useEffect(() => {
    if (contentRef.current) {
        contentRef.current.innerHTML = content;
    }
  }, [content]); // Run once on mount

  // Function to handle saving/updating the note
  const handleSave = () => {
      console.log('Note Updated:', {
          id: noteData.id,
          title,
          content,
          category: selectedCategory,
          color: selectedBgColor.token
      });
      // 💡 Add API call to update the note in the database
  }

  return (
    // Note Editor Container: Dynamic background color
    <div className={`w-full max-w-[1000px] h-screen md:h-[90vh] mx-auto ${selectedBgColor.class} rounded-xl shadow-2xl flex flex-col overflow-hidden font-inter transition-colors duration-300`}>
      
      <Header />

      <Toolbar />

      {/* --- Category and Color Selector Bar --- */}
      <div className="flex justify-between items-center p-4 md:px-10 border-b border-[#EAEAEA] bg-opacity-70 backdrop-blur-sm">
        
        {/* Category Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[#666666]">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-1 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:ring-[#4B65F6] focus:border-[#4B65F6]"
          >
            {CATEGORY_DATA.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Background Color Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[#666666]">Background:</label>
          <div className="flex gap-1">
            {BG_COLOR_OPTIONS.map(color => (
              <button
                key={color.token}
                onClick={() => setSelectedBgColor(color)}
                className={`w-5 h-5 rounded-full shadow-sm border-2 transition-colors duration-200`}
                style={{ backgroundColor: color.color, borderColor: selectedBgColor.token === color.token ? '#4B65F6' : 'transparent' }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        {/* Save/Update Button */}
        <button 
            onClick={handleSave}
            className="py-1 px-4 bg-[#4B65F6] text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
            Update
        </button>

      </div>
      {/* -------------------------------------- */}

      {/* Main Writing Canvas */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto relative">
        
        {/* Title Input */}
        <input 
          type="text" 
          placeholder="Note Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-none outline-none text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 p-0 bg-transparent caret-[#4B65F6]"
        />
        
        {/* Body Content */}
        <div 
          ref={contentRef} // Reference to the div
          contentEditable="true"
          placeholder="Start writing your note here..."
          onInput={(e) => setContent(e.currentTarget.textContent)}
          className="min-h-[calc(100%-100px)] outline-none text-base leading-relaxed text-[#1A1A1A] caret-[#4B65F6] p-0"
          // Note: The content is initialized via the useEffect hook
        >
          {/* Initial content comes from state/props */}
        </div>
        
        {/* Autosave Indicator */}
        <div className="absolute bottom-4 left-10 text-xs text-[#666666] opacity-70">
          Auto-saved 5 seconds ago
        </div>
      </main>
      
    </div>
  );
}

export default EditePage;