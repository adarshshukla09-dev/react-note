import express from "express";
// ⚠️ Ensure the import path is correct for your project structure
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../Controllers/NotesControllers.js";
import { protect } from "../middlewares/auth.middleware.js";

// Create a new router instance
const router = express.Router();

// Create a new note
router.post("/create", protect, createNote);

// Get all notes for the authenticated user
router.get("/", protect, getAllNotes);

// Get a single note by ID
router.get("/:id", protect, getNoteById);

// Update a note by ID
router.put("/:id", protect, updateNote);

// Delete a note by ID
router.delete("/:id", protect, deleteNote);

export default router;
