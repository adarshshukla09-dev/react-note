import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Full Name: Recommended to be required for personalization
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: 50,
    },

    // Email: Essential for login and must be unique
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true, // Ensures no two users share the same email
      lowercase: true,
      // Basic email format validation (more complex validation usually happens in the controller/service layer)
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },

    // Password: Hashed password for security
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // CRITICAL: Prevents the password hash from being accidentally sent in queries
    },

    // Status: To track if the user account is active/verified
    isActive: {
      type: Boolean,
      default: true,
    },

    // Role (Optional): Useful if you want different permissions (e.g., admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.model("User", UserSchema);
export default User;
