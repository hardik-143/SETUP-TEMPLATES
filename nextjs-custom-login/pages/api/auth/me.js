const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const connectToDatabase = require("../../../lib/mongodb");
const User = require("../../../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    await connectToDatabase();
    const user = await User.findById(payload.sub).select("-password");
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
