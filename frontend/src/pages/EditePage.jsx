// EditePage.jsx

import React, { useState, useEffect } from 'react';
import { useNoteContext } from '../context/NoteContext';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNote, getNotes } from '../api/Note'; // Assuming 'getNotes' is the correct name

function EditePage() {
  // We use editNote just for the initial load, but rely on the ID for robustness
  const { editNote, setEditNote, setNote } = useNoteContext();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State to manage loading/error UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state to hold form data
  const [formData, setFormData] = useState({
    title: '',
    content: '', 
    // Assuming 'preview' is derived from 'content' by the backend
    accentColor: 'default', 
  });
  
  // --- Data Fetching and Initialization ---
  useEffect(() => {
    const initializeForm = async () => {
      setLoading(true);
      setError(null);
      let noteToEdit = editNote;

      // 1. Check if the note is already in context AND matches the URL ID
      if (!noteToEdit || noteToEdit._id !== id) {
        try {
          // 2. If not, fetch it from the API using the ID
          const response = await getNotes(id);
          noteToEdit = response.data; // Assuming API returns note object directly in .data
          setEditNote(noteToEdit); // Update context state as well
        } catch (err) {
          console.error("Failed to fetch note:", err);
          setError("Note not found or an error occurred.");
          setLoading(false);
          // Optional: redirect after showing error for a few seconds
          setTimeout(() => navigate('/'), 3000); 
          return;
        }
      }

      // 3. Set the form data from the note
      if (noteToEdit) {
        setFormData({
          title: noteToEdit.title,
          content: noteToEdit.content || noteToEdit.preview || '', // Use content or fall back to preview
          accentColor: noteToEdit.accentColor || 'default',
        });
      }

      setLoading(false);
    };

    initializeForm();
  }, [id, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Form Submission (Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || loading) return;

    try {
      // 1. Prepare data to send (including preview derived from content)
      const dataToUpdate = {
        title: formData.title,
        content: formData.content,
        // The preview needs to be updated too, often the first few chars of content
        preview: formData.content.substring(0, 100), 
        accentColor: formData.accentColor,
      };

      // 2. Call the update API
      await updateNote(id, dataToUpdate);
      
      // 3. Success Feedback and Redirection
      alert("Note updated successfully!");
      setEditNote(null); // Clear the editing state
      navigate('/');

    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to save changes. Please check your network and try again.");
    }
  };

  // --- Render UI ---
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading note for editing...</div>;
  }
  
  if (error) {
    return <div className="text-center mt-20 text-xl text-red-500 font-semibold">{error}</div>;
  }


  return (
    <div className="container mx-auto p-6 max-w-2xl dark:bg-gray-800 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-500 dark:text-indigo-400">
        Edit Note: {formData.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        {/* Accent Color Selection */}
        <div>
          <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Accent Color</label>
          <select
            id="accentColor"
            name="accentColor"
            value={formData.accentColor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="default">Default</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="pink">Pink</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditePage;