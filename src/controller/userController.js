import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import pool from "../db/pg.js";

dotenv.config();

// REGISTER USER
export const register = async (req, res) => {
  const { username, email, first_name, last_name, phone, password, retype_password } = req.body;

  // Validasi password dan retype_password
  if (password !== retype_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  
  try {
    // Periksa apakah username atau email sudah ada
    const validRoles = ["user", "admin", "developer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat ID unik dengan panjang 6 karakter menggunakan crypto.randomBytes
    let userId;
    let userExists;

    do {
      userId = crypto.randomBytes(3).toString("hex");
      const checkUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
      userExists = checkUser.rows.length > 0;
    } while (userExists);

    // Simpan pengguna ke database
    await pool.query(
      "INSERT INTO users (user_id, username, email, first_name, last_name, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [userId, username, email, first_name, last_name, phone, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cari user berdasarkan username atau email
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: "Username or email not found" });
    }

    const user = userQuery.rows[0];

    // Periksa apakah password valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, user_id: user.user_id, username: user.username, email: user.email,role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("username", user.username, { httpOnly: true });

    res.status(200).json({ message: "Login successfully", token, user_id: user.user_id });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Decoded user ID:", userId);

    // Periksa apakah user ada di database
    const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Simpan waktu logout
    await pool.query("UPDATE users SET logout_time = NOW() WHERE id = $1", [userId]);

    // Hapus cookie
    res.clearCookie("username");

    res.json({ message: "Logout recorded successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};
