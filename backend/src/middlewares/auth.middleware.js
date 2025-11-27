import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ msg: "Invalid/Expired Token" });
  }
};
