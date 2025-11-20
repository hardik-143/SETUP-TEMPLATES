const bcrypt = require("bcryptjs");
const connectToDatabase = require("../../../lib/mongodb");
const User = require("../../../models/User");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    return res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
