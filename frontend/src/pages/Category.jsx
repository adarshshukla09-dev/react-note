import React, { useState } from 'react';

// Sample categories
const initialCategories = [
  { id: 1, name: 'Work', color: 'bg-blue-100', text: 'text-blue-700', primary: 'hover:bg-blue-200' },
  { id: 2, name: 'Ideas', color: 'bg-yellow-100', text: 'text-yellow-700', primary: 'hover:bg-yellow-200' },
  { id: 3, name: 'Personal', color: 'bg-pink-100', text: 'text-pink-700', primary: 'hover:bg-pink-200' },
  { id: 4, name: 'Study', color: 'bg-green-100', text: 'text-green-700', primary: 'hover:bg-green-200' },
];

function Category({ isOpen, onClose, onSelectCategory }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('bg-gray-100');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  // Function to simulate adding a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    const newCat = {
      id: Date.now(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
      text: 'text-gray-700', // Default text color
      primary: 'hover:bg-gray-200'
    };
    setCategories([...categories, newCat]);
    setNewCategoryName('');
    setNewCategoryColor('bg-gray-100');
    setIsEditing(false);
  };

  // Simplified color options for new categories
 const  colorOptions = [
    { bg: 'bg-blue-100', text: 'text-blue-700' },
    { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    { bg: 'bg-pink-100', text: 'text-pink-700' },
    { bg: 'bg-green-100', text: 'text-green-700' },
  ];

  return (
    // Backdrop for the modal
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      
      {/* Category Management Panel */}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 font-inter transform transition-transform duration-300 scale-100">
        
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4 border-b pb-2">Manage Categories</h2>

        {/* Current Categories List */}
        <div className="flex flex-wrap gap-2 mb-6 max-h-40 overflow-y-auto p-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)} // Function to select category in the sidebar/note
              className={`text-sm font-medium ${cat.color} ${cat.text} px-3 py-1 rounded-full transition-colors ${cat.primary} shadow-sm`}
            >
              {cat.name}
              {/* Optional: Add a subtle 'X' icon for deletion/editing if needed */}
            </button>
          ))}
        </div>

        {/* Add New Category Section */}
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="w-full py-2 bg-[#4B65F6] text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors shadow-md"
          >
            + Create New Category
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Category Name (e.g., Finance)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4B65F6] focus:border-[#4B65F6]"
            />
            
            {/* Color Picker (Simplified) */}
            <div className="flex gap-2">
                {colorOptions.map((color, index) => (
                    <button 
                        key={index}
                        onClick={() => setNewCategoryColor(color.bg)}
                        className={`w-6 h-6 rounded-full ${color.bg} border-2 ${newCategoryColor === color.bg ? 'border-[#4B65F6]' : 'border-white'} shadow-sm`}
                    />
                ))}
            </div>

            <div className="flex gap-2 justify-end">
                <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-[#666666] border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-[#4B65F6] text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                    Add
                </button>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="mt-4 w-full text-[#4B65F6] py-1 text-sm rounded-lg hover:bg-[#DCE2FF] transition-colors"
        >
          Close
        </button>
        
      </div>
    </div>
  );
};


export default Category;
