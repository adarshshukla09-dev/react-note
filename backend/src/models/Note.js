import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Untitled Note",
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    preview: {
      type: String,
      trim: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    accentColor: {
      type: String,
      enum: ["white", "yellow", "blue", "pink", "green"],
      default: "white",
    },

    tags: [
      {
        name: { type: String, required: true },
        color: {
          type: String,
          enum: ["blue", "pink", "yellow", "green", "gray"],
          default: "gray",
        },
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-generate preview before save
// Auto-generate preview on save
NoteSchema.pre("save", function () {
  if (this.content) {
    this.preview =
      this.content.substring(0, 120) + (this.content.length > 120 ? "..." : "");
  }
});

// Auto-generate preview on findOneAndUpdate

const Note = mongoose.model("Note", NoteSchema);
export default Note;
