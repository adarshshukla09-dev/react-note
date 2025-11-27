import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,

      sameSite: "Strict",
    });

    res.status(201).json({
      message: "User registered & logged in",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).send("something wrong at time of resgister");
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(500).json({ message: "Internal server error" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(500).json({ message: "incorrect password" });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JS (more secure)
      secure: process.env.NODE_ENV === "production", // Only transmit over HTTPS in production
      maxAge: 3600000, // Cookie expiration (e.g., 1 hour, matches token expiration)
      sameSite: "Strict", // Recommended for security
    });

    // --- Change the response body to not include the token ---
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error during login");
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
