// middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set in environment");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      // put user data on req.user for route handlers
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ error: "Auth check failed" });
  }
}
