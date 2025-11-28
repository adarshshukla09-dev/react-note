import Note from "../models/Note.js";
import mongoose from "mongoose";

// TEMP helper until real auth added

// POST /api/notes/create
export const createNote = async (req, res) => {
  try {
    const { title, content, accentColor, categories } = req.body;

    const newNoteData = {
      title,
      content,
      accentColor,
      categories,
      user: req.user.id,
    };

    const createdNote = await Note.create(newNoteData);

    return res.status(201).json({
      message: "Note created successfully",
      note: createdNote,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

// GET /api/notes/
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .lean(); // Faster for read-only

    return res.status(200).json({
      message: "Notes obtained successfully",
      notes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/notes/:id
export const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const note = await Note.findOne({
      _id: noteId,
      // user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ note });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({ message: "Invalid note ID format." });
    }
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/notes/:id
export const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        user: userId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found or you don't have permission to update it.",
      });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found or you don't have permission to delete it.",
      });
    }

    return res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
