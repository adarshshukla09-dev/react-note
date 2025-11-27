import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/notes";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies automatically
});

// Get all notes
export const getAllNotes = () => api.get("/");

// Get a single note
export const getNotes = (id) => api.get(`/${id}`);

// Create a note
export const createNote = (noteData) => api.post("/create", noteData);

// Update a note
export const updateNote = (id, data) => api.put(`/${id}`, data);

// Delete a note
export const deleteNote = (id) => api.delete(`/${id}`);
